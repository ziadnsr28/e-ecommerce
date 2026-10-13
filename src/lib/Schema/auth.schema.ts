import * as z from "zod";

// Defines validation rules for the user registration form.
export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be less than 50 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*-]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    rePassword: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be less than 50 characters"),
    phone: z.string().min(11, "Phone number must be exactly 11 digits").max(11, "Phone number must be exactly 11 digits").regex(/^01[0125][0-9]{8}$/, "Phone number must start with 010, 011, 012, or 015"),
    terms: z.boolean().refine((val) => val === true, {message: "You must accept the terms and conditions",  }),
}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;

// Defines validation rules for the user login form.
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be less than 50 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*-]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    keepSignedIn: z.boolean().optional(),
})
export type loginSchemaType = z.infer<typeof loginSchema>;