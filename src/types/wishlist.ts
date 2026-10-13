import { Daum } from "./product";

/** Response from GET /api/v1/wishlist */
export interface WishlistResponse {
  status: string;
  count: number;
  data: Daum[];
}

/** Response from POST /api/v1/wishlist and DELETE /api/v1/wishlist/:productId */
export interface WishlistMutationResponse {
  status: string;
  message: string;
  data: string[]; // Array of wishlist product IDs
}
