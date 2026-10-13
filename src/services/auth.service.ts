import { loginSchemaType, RegisterSchemaType } from "@/lib/Schema/auth.schema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

// Submits new user registration data to the authentication API.
export async function postregister(formData: RegisterSchemaType) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

// Submits user login credentials to the signin API.
export async function postlogin(formData: loginSchemaType) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/signin`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}