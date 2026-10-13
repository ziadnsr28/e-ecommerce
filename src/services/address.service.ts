import {
  AddressInput,
  AddressesResponse,
  AddressMutationResponse,
  SingleAddressResponse,
} from "@/types/address";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

/**
 * Fetches all saved delivery addresses for the authenticated user.
 */
export async function getUserAddresses(
  token: string
): Promise<AddressesResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const data = await response.json();
  return data;
}

/**
 * Adds a new delivery address for the authenticated user.
 */
export async function addAddressApi(
  token: string,
  body: AddressInput
): Promise<AddressMutationResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

/**
 * Deletes a specific address for the authenticated user.
 */
export async function deleteAddressApi(
  token: string,
  addressId: string
): Promise<AddressMutationResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  const data = await response.json();
  return data;
}

/**
 * Fetches a single specific address by its ID.
 */
export async function getAddressByIdApi(
  token: string,
  addressId: string
): Promise<SingleAddressResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/addresses/${addressId}`, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const data = await response.json();
  return data;
}
