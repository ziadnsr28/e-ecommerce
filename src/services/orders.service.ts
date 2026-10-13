import { IOrder } from "@/types/order";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

/**
 * Fetches all orders belonging to a specific user.
 * Route Misr endpoint: GET /api/v1/orders/user/:userId
 */
export async function getUserOrders(userId: string): Promise<IOrder[]> {
  const response = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch orders: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
