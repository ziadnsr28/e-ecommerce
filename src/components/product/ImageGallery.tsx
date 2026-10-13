"use client";
import { useState } from "react";
import Image from "next/image";

// Renders a product image gallery with a main display and clickable thumbnails.
export default function ImageGallery({ images, title }: { images: string[]; title: string }) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div>
            <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                <Image
                    src={images[activeImage]}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                />
            </div>
            <div className="flex gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 ${
                            activeImage === i ? "border-green-600 shadow-md" : "border-gray-200"
                        }`}
                    >
                        <Image src={img} alt={`${title} thumbnail ${i + 1}`} fill sizes="64px" className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}