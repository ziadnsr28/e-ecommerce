"use server";

import { getTokenServer } from "@/lib/auth";
import { getUserOrders } from "@/services/orders.service";
import { IOrder } from "@/types/order";

export interface OrdersActionResult {
  success: boolean;
  message: string;
  data: IOrder[];
}

/**
 * Extracts the user's ObjectId from the Route Misr JWT payload.
 */
function getUserIdFromToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payloadJson = Buffer.from(parts[1], "base64").toString("utf-8");
    const payload = JSON.parse(payloadJson);
    return payload.id || payload._id || payload.userId || null;
  } catch {
    return null;
  }
}

/**
 * Server action to fetch the current authenticated user's orders.
 */
export async function getUserOrdersAction(): Promise<OrdersActionResult> {
  const token = await getTokenServer();
  if (!token) {
    return {
      success: false,
      message: "Please sign in to view your orders",
      data: [],
    };
  }

  const userId = getUserIdFromToken(token);
  if (!userId) {
    return {
      success: false,
      message: "Unable to identify user from session token",
      data: [],
    };
  }

  try {
    const orders = await getUserOrders(userId);
    return {
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    };
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to load orders",
      data: [],
    };
  }
}
