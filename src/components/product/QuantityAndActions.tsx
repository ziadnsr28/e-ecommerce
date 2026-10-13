"use client";
import {  useState } from "react";
import { Spinner } from "../ui/spinner";
import { AddToCart } from "./addproduct";

// Renders quantity selection controls and the primary add-to-cart action button for a product.
export default function QuantityAndActions({
    prodectid,
    price,
    maxQuantity,
}: {
    price: number;
    maxQuantity: number;
    prodectid: string
}) {

    const { isLoading, addProduct } = AddToCart(prodectid);


    const [quantity, setQuantity] = useState(1);
    const totalPrice = (price * quantity).toFixed(2);

    return (
        <>
            <div className="mb-5">
                <div className="mb-2 text-[13px] font-semibold text-gray-900">Quantity</div>
                <div className="inline-flex items-center rounded-[10px] border border-gray-200">
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-150 hover:bg-gray-100 active:scale-90"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                    <button
                        onClick={() => {
                            setQuantity((q) => Math.min(maxQuantity, q + 1));
                        }}
                        className="flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-150 hover:bg-gray-100 active:scale-90"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="mb-5 flex items-center justify-between border-y border-gray-100 py-4">
                <span className="text-sm font-medium text-gray-600">Total Price</span>
                <span className="text-lg font-extrabold text-green-600">{totalPrice} EGP</span>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <button
                    type="button"
                    onClick={() => {
                        addProduct(prodectid)
                    }}
                    className="flex items-center justify-center gap-2 rounded-[10px] bg-green-600 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-lg active:scale-[0.98]"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Spinner className="h-4 w-4 animate-spin" />
                            Loading...
                        </span>
                    ) : <span> Add To Cart</span>}
                </button>
                <button className="flex items-center justify-center gap-2 rounded-[10px] bg-gray-900 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]">
                    Buy Now
                </button>
            </div>
        </>
    );
}