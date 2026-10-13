"use server";

import { getTokenServer } from "@/lib/auth";
import {
  getUserAddresses,
  addAddressApi,
  deleteAddressApi,
  getAddressByIdApi,
} from "@/services/address.service";
import {
  addressSchema,
  AddressSchemaType,
} from "@/lib/Schema/address.schema";
import { IAddress } from "@/types/address";

export interface AddressListActionResult {
  success: boolean;
  message: string;
  data: IAddress[];
}

export interface SingleAddressActionResult {
  success: boolean;
  message: string;
  data: IAddress | null;
}

export interface AddressMutationActionResult {
  success: boolean;
  message: string;
  data?: IAddress[];
}

/**
 * Server action to fetch all addresses for the logged-in user.
 */
export async function getAddressesAction(): Promise<AddressListActionResult> {
  const token = await getTokenServer();
  if (!token) {
    return {
      success: false,
      message: "Please sign in to view your addresses",
      data: [],
    };
  }

  try {
    const res = await getUserAddresses(token);
    if (res.status === "success") {
      return {
        success: true,
        message: res.message || "Addresses retrieved successfully",
        data: Array.isArray(res.data) ? res.data : [],
      };
    }
    return {
      success: false,
      message: res.message || "Failed to retrieve addresses",
      data: [],
    };
  } catch (error) {
    console.error("Error in getAddressesAction:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching addresses",
      data: [],
    };
  }
}

/**
 * Server action to add a new address.
 */
export async function addAddressAction(
  formData: AddressSchemaType
): Promise<AddressMutationActionResult> {
  const validation = addressSchema.safeParse(formData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid input data";
    return { success: false, message: firstError };
  }

  const token = await getTokenServer();
  if (!token) {
    return {
      success: false,
      message: "Please sign in to add an address",
    };
  }

  try {
    const res = await addAddressApi(token, validation.data);
    if (res.status === "success") {
      return {
        success: true,
        message: res.message || "Address added successfully",
        data: Array.isArray(res.data) ? res.data : [],
      };
    }
    return {
      success: false,
      message: res.message || "Failed to add address",
    };
  } catch (error) {
    console.error("Error in addAddressAction:", error);
    return {
      success: false,
      message: "An unexpected error occurred while adding the address",
    };
  }
}

/**
 * Server action to delete an address by ID.
 */
export async function deleteAddressAction(
  addressId: string
): Promise<AddressMutationActionResult> {
  if (!addressId) {
    return {
      success: false,
      message: "Invalid address ID",
    };
  }

  const token = await getTokenServer();
  if (!token) {
    return {
      success: false,
      message: "Please sign in to delete this address",
    };
  }

  try {
    const res = await deleteAddressApi(token, addressId);
    if (res.status === "success") {
      return {
        success: true,
        message: res.message || "Address removed successfully",
        data: Array.isArray(res.data) ? res.data : [],
      };
    }
    return {
      success: false,
      message: res.message || "Failed to remove address",
    };
  } catch (error) {
    console.error("Error in deleteAddressAction:", error);
    return {
      success: false,
      message: "An unexpected error occurred while removing the address",
    };
  }
}

/**
 * Server action to fetch a specific address by ID.
 * Returns data: null if not found.
 */
export async function getAddressByIdAction(
  addressId: string
): Promise<SingleAddressActionResult> {
  if (!addressId) {
    return {
      success: false,
      message: "Invalid address ID",
      data: null,
    };
  }

  const token = await getTokenServer();
  if (!token) {
    return {
      success: false,
      message: "Please sign in to view this address",
      data: null,
    };
  }

  try {
    const res = await getAddressByIdApi(token, addressId);
    if (res.status === "success" && res.data) {
      return {
        success: true,
        message: "Address retrieved successfully",
        data: res.data,
      };
    }
    return {
      success: false,
      message: res.message || "Address not found",
      data: null,
    };
  } catch (error) {
    console.error("Error in getAddressByIdAction:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching the address",
      data: null,
    };
  }
}
