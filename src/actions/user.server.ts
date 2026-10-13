"use server";

import { getTokenServer } from "@/lib/auth";
import { changeMyPasswordApi } from "@/services/user.service";
import {
  ChangePasswordSchemaType,
  changePasswordSchema,
} from "@/lib/Schema/changePassword.schema";

export interface ChangePasswordActionResult {
  success: boolean;
  message: string;
}

/**
 * Server Action to change the authenticated user's password.
 */
export async function changePasswordAction(
  formData: ChangePasswordSchemaType
): Promise<ChangePasswordActionResult> {
  const validation = changePasswordSchema.safeParse(formData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid input data";
    return { success: false, message: firstError };
  }

  const token = await getTokenServer();
  if (!token) {
    return { success: false, message: "Please log in to change your password" };
  }

  try {
    const data = await changeMyPasswordApi(token, validation.data);

    if (data.message === "success") {
      return { success: true, message: "Password updated successfully" };
    }

    let errorMessage = "Failed to update password";
    if (typeof data.errors === "object" && data.errors?.msg) {
      errorMessage = data.errors.msg;
    } else if (typeof data.errors === "string") {
      errorMessage = data.errors;
    } else if (data.message && data.message !== "fail") {
      errorMessage = data.message;
    } else if (data.statusMsg && data.statusMsg !== "fail") {
      errorMessage = data.statusMsg;
    }

    return { success: false, message: errorMessage };
  } catch (error) {
    console.error("Error in changePasswordAction:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
