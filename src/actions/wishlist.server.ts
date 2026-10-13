"use server";

import { getTokenServer } from "@/lib/auth";
import {
  getUserWishlist,
  addToWishlistApi,
  removeFromWishlistApi,
} from "@/services/wishlist.service";
import { WishlistResponse, WishlistMutationResponse } from "@/types/wishlist";

export interface WishlistActionResult {
  success: boolean;
  message: string;
  data?: WishlistResponse;
}

export interface WishlistMutationResult {
  success: boolean;
  message: string;
  ids?: string[];
}

/** Fetch the authenticated user's wishlist. */
export async function getWishlistAction(): Promise<WishlistActionResult> {
  const token = await getTokenServer();
  if (!token) {
    return { success: false, message: "يرجى تسجيل الدخول أولاً" };
  }

  try {
    const data: WishlistResponse = await getUserWishlist(token);
    if (data.status === "success") {
      return { success: true, message: "تم جلب قائمة الرغبات", data };
    }
    return { success: false, message: "فشل في جلب قائمة الرغبات" };
  } catch {
    return { success: false, message: "حدث خطأ أثناء جلب قائمة الرغبات" };
  }
}

/** Add a product to the authenticated user's wishlist. */
export async function addToWishlistAction(
  productId: string
): Promise<WishlistMutationResult> {
  const token = await getTokenServer();
  if (!token) {
    return { success: false, message: "يرجى تسجيل الدخول أولاً" };
  }

  try {
    const data: WishlistMutationResponse = await addToWishlistApi(
      productId,
      token
    );
    if (data.status === "success") {
      return {
        success: true,
        message: data.message || "تمت الإضافة إلى قائمة الرغبات",
        ids: data.data,
      };
    }
    return {
      success: false,
      message: data.message || "فشل في إضافة المنتج إلى المفضلة",
    };
  } catch {
    return { success: false, message: "حدث خطأ أثناء إضافة المنتج إلى المفضلة" };
  }
}

/** Remove a product from the authenticated user's wishlist. */
export async function removeFromWishlistAction(
  productId: string
): Promise<WishlistMutationResult> {
  const token = await getTokenServer();
  if (!token) {
    return { success: false, message: "يرجى تسجيل الدخول أولاً" };
  }

  try {
    const data: WishlistMutationResponse = await removeFromWishlistApi(
      productId,
      token
    );
    if (data.status === "success") {
      return {
        success: true,
        message: data.message || "تم حذف المنتج من قائمة الرغبات",
        ids: data.data,
      };
    }
    return {
      success: false,
      message: data.message || "فشل في حذف المنتج من المفضلة",
    };
  } catch {
    return { success: false, message: "حدث خطأ أثناء حذف المنتج من المفضلة" };
  }
}
