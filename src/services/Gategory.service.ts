const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

// Fetches the list of all product categories from the external API.
export async function getAllCategories() {
    const response = await fetch(`${BASE_URL}/api/v1/categories`);
    const data = await response.json();
    return data;
}

// Fetches details for a single category by its unique ID.
export async function getSingleCategory(id: string) {
    const response = await fetch(`${BASE_URL}/api/v1/categories/${id}`);
    const data = await response.json();
    return data;
}