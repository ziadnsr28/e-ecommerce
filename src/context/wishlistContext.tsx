"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Daum } from "@/types/product";
import {
  getWishlistAction,
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/actions/wishlist.server";

interface WishlistContextType {
  wishlistItems: Daum[];
  wishlistIds: string[];
  wishlistCount: number;
  isLoading: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
  handleWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  wishlistIds: [],
  wishlistCount: 0,
  isLoading: false,
  isInWishlist: () => false,
  toggleWishlist: async () => false,
  removeFromWishlist: async () => false,
  handleWishlist: async () => {},
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [wishlistItems, setWishlistItems] = useState<Daum[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Track the current session user to detect account changes and
  // prevent stale async responses from overwriting fresh data.
  const sessionEmailRef = useRef<string | null | undefined>(undefined);

  // Set of product IDs currently being toggled — prevents duplicate requests
  // for the same product while allowing concurrent toggles on different products.
  const togglingRef = useRef<Set<string>>(new Set());

  const wishlistCount = wishlistIds.length;

  /** Check if a product is in the wishlist — O(1) via Set lookup. */
  const idsSetRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    idsSetRef.current = new Set(wishlistIds);
  }, [wishlistIds]);

  const isInWishlist = useCallback((productId: string): boolean => {
    return idsSetRef.current.has(productId);
  }, []);

  /** Fetch the full wishlist from the API and update state. */
  const handleWishlist = useCallback(async () => {
    if (status !== "authenticated") return;

    const currentEmail = session?.user?.email;
    setIsLoading(true);

    try {
      const result = await getWishlistAction();

      // Guard: if the session changed while the request was in-flight, discard.
      if (sessionEmailRef.current !== currentEmail) return;

      if (result.success && result.data) {
        const items = result.data.data ?? [];
        const ids = items.map((item) => item._id);
        setWishlistItems(items);
        setWishlistIds(ids);
      }
      // On failure: keep whatever valid state we had before.
    } catch {
      // Network/server error — keep previous state.
    } finally {
      setIsLoading(false);
    }
  }, [status, session?.user?.email]);

  /** Toggle a product in/out of the wishlist. Returns true on success. */
  const toggleWishlist = useCallback(
    async (productId: string): Promise<boolean> => {
      // Block while session is loading.
      if (status === "loading") return false;

      // Prompt unauthenticated users without redirecting.
      if (status !== "authenticated") {
        toast.error("يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى قائمة الرغبات");
        return false;
      }

      // Prevent duplicate requests for the same product.
      if (togglingRef.current.has(productId)) return false;
      togglingRef.current.add(productId);

      const currentEmail = session?.user?.email;

      try {
        const alreadyInWishlist = idsSetRef.current.has(productId);

        if (alreadyInWishlist) {
          // REMOVE
          const result = await removeFromWishlistAction(productId);

          if (sessionEmailRef.current !== currentEmail) return false;

          if (result.success && result.ids) {
            setWishlistIds(result.ids);
            setWishlistItems((prev) =>
              prev.filter((item) => item._id !== productId)
            );
            toast.success("تم حذف المنتج من قائمة الرغبات");
            return true;
          } else {
            toast.error(result.message || "فشل في حذف المنتج من المفضلة");
            return false;
          }
        } else {
          // ADD
          const result = await addToWishlistAction(productId);

          if (sessionEmailRef.current !== currentEmail) return false;

          if (result.success && result.ids) {
            setWishlistIds(result.ids);
            // Note: POST doesn't return full product objects, so we don't add
            // to wishlistItems here. The full item will appear when the user
            // visits the wishlist page (handleWishlist fetches full objects).
            toast.success("تمت الإضافة إلى قائمة الرغبات");
            return true;
          } else {
            toast.error(result.message || "فشل في إضافة المنتج إلى المفضلة");
            return false;
          }
        }
      } catch {
        toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
        return false;
      } finally {
        togglingRef.current.delete(productId);
      }
    },
    [status, session?.user?.email]
  );

  /** Remove a product from the wishlist. Returns true on success. */
  const removeFromWishlist = useCallback(
    async (productId: string): Promise<boolean> => {
      if (status !== "authenticated") {
        toast.error("يرجى تسجيل الدخول أولاً");
        return false;
      }

      if (togglingRef.current.has(productId)) return false;
      togglingRef.current.add(productId);

      const currentEmail = session?.user?.email;

      try {
        const result = await removeFromWishlistAction(productId);

        if (sessionEmailRef.current !== currentEmail) return false;

        if (result.success && result.ids) {
          setWishlistIds(result.ids);
          setWishlistItems((prev) =>
            prev.filter((item) => item._id !== productId)
          );
          toast.success("تم حذف المنتج من قائمة الرغبات");
          return true;
        } else {
          toast.error(result.message || "فشل في حذف المنتج من المفضلة");
          return false;
        }
      } catch {
        toast.error("حدث خطأ أثناء حذف المنتج");
        return false;
      } finally {
        togglingRef.current.delete(productId);
      }
    },
    [status, session?.user?.email]
  );

  // ── Session synchronization ──────────────────────────────────────────
  // When session changes: clear stale data, fetch fresh data for the new user.
  useEffect(() => {
    const currentEmail = session?.user?.email ?? null;
    const previousEmail = sessionEmailRef.current;

    // Update the ref for stale-response guards.
    sessionEmailRef.current = currentEmail;

    if (status === "unauthenticated") {
      // User logged out — clear everything in a macrotask/async dispatch.
      queueMicrotask(() => {
        setWishlistItems([]);
        setWishlistIds([]);
        setIsLoading(false);
        togglingRef.current.clear();
      });
      return;
    }

    if (status === "authenticated") {
      // Either first load or account change — fetch fresh data.
      if (previousEmail !== currentEmail || previousEmail === undefined) {
        handleWishlist();
      }
    }
    // status === "loading": do nothing, wait.
  }, [status, session?.user?.email, handleWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistIds,
        wishlistCount,
        isLoading,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        handleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
