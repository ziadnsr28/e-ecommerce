import { Iproduct, IProductResponse } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

// Fetches the catalog of all products from the external API.
export async function getAllProducts(brand?: string, category?: string): Promise<IProductResponse> {
  const url = brand
    ? `${BASE_URL}/api/v1/products?brand=${brand}`
    : category
    ? `${BASE_URL}/api/v1/products?category=${category}`
    : `${BASE_URL}/api/v1/products`;

  const res = await fetch(url);
  return res.json();
}

// Fetches details for a single product by its unique product ID.
export async function getSingleProduct(productid: string): Promise<{ data: Iproduct; message?: string }> {
    const response = await fetch(`${BASE_URL}/api/v1/products/${productid}`);
    const data = await response.json();
    return data;
}