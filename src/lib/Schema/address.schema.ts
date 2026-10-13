import * as z from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(1, "Address label is required (e.g. Home, Work)")
    .max(50, "Address label must be less than 50 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(50, "City must be less than 50 characters"),
  phone: z
    .string()
    .min(11, "Phone number must be exactly 11 digits")
    .max(11, "Phone number must be exactly 11 digits")
    .regex(
      /^01[0125][0-9]{8}$/,
      "Phone number must start with 010, 011, 012, or 015"
    ),
  details: z
    .string()
    .min(3, "Detailed address must be at least 3 characters")
    .max(150, "Detailed address must be less than 150 characters"),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;
