import { ChangePasswordRequest, ChangePasswordApiResponse } from "@/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

/**
 * Sends a PUT request to update the user's password using Route Misr API.
 */
export async function changeMyPasswordApi(
  token: string,
  body: ChangePasswordRequest
): Promise<ChangePasswordApiResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}
