const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

// Adds a product item to the authenticated user's server cart.
export async function addCart(productId: string, token: string) {
    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة");
    }
    const response = await fetch(`${BASE_URL}/api/v2/cart`, {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
    });
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`خطأ في الإضافة: ${errorBody}`);
    }
    return await response.json();
}

// Retrieves the authenticated user's current cart from the server.
export async function addproductincart(token: string) {
    const response = await fetch(`${BASE_URL}/api/v2/cart`, {
        headers: {
            token: token,
        },
    });
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`خطأ في الإضافة: ${errorBody}`);
    }
    return await response.json();
}

// Removes an individual product from the authenticated user's server cart.
export async function removePtroduc(productId: string, token: string) {
    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة");
    }
    const response = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
        method: "DELETE",
        headers: {
            token: token,
        },
    });
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`خطأ في الإضافة: ${errorBody}`);
    }
    return await response.json();
}

// Clears all products from the authenticated user's server cart.
export async function removeAllPtroduc(token: string) {
    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة");
    }
    const response = await fetch(`${BASE_URL}/api/v2/cart`, {
        method: "DELETE",
        headers: {
            token: token,
        },
    });
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`خطأ في الإضافة: ${errorBody}`);
    }
    return await response.json();
}

// Updates the quantity count of a specific product in the server cart.
export async function updateCartProductQuantity(productId: string, token: string, count: number) {
    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة");
    }
    const response = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
        method: "PUT",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ count }),
    });
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`خطأ في الإضافة: ${errorBody}`);
    }
    return await response.json();
}