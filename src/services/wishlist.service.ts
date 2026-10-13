import { WishlistResponse, WishlistMutationResponse } from "@/types/wishlist";

const BASE_URL = "https://ecommerce.routemisr.com";

/** Fetch all wishlist items for the authenticated user. */
export async function getUserWishlist(
  token: string
): Promise<WishlistResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "GET",
    headers: { token },
  });

  if (!res.ok) {
    throw new Error(`Wishlist fetch failed: ${res.status}`);
  }

  return res.json();
}

/** Add a product to the authenticated user's wishlist. */
export async function addToWishlistApi(
  productId: string,
  token: string
): Promise<WishlistMutationResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error(`Add to wishlist failed: ${res.status}`);
  }

  return res.json();
}

/** Remove a product from the authenticated user's wishlist. */
export async function removeFromWishlistApi(
  productId: string,
  token: string
): Promise<WishlistMutationResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token },
  });

  if (!res.ok) {
    throw new Error(`Remove from wishlist failed: ${res.status}`);
  }

  return res.json();
}
