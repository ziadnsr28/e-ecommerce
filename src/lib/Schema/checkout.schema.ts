import { z } from "zod";
export const checkoutSchematype = z.object({
  city: z.string().trim().min(1, "City is required"),
  streetAddress: z.string().trim().min(1, "Street address is required"),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^(?:\+20|0)1[0125]\d{8}$/,
      "Enter a valid Egyptian mobile number, e.g. 01012345678 or +201012345678"
    ),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchematype>;