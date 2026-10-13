import type { Metadata } from "next";
import {
    Star,
    Truck,
    RotateCcw,
    ShieldCheck,
} from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Iproduct } from "@/types/product";
import ImageGallery from "@/components/product/ImageGallery";
import QuantityAndActions from "@/components/product/QuantityAndActions";
import WishlistButton from "@/components/product/WishlistButton";
import ProductTabs from "@/components/product/ProductTabs";
import ProductCard from "@/components/product/productcard";
import { getAllProducts, getSingleProduct } from "@/services/allproduct.service";
import NotFound from "./not-found";

export const metadata: Metadata = {
    title: "Product Details",
};

const TRUST_POINTS = [
    { Icon: Truck, label: "Free Delivery" },
    { Icon: RotateCcw, label: "30 Days Return" },
    { Icon: ShieldCheck, label: "Secure Payment" },
];

// Renders the product details page including image gallery, product information, and purchase actions.
export default async function ProductDetailsServer({ params }: { params: Promise<{ productid: string }> }) {
    console.log()
    const { productid } = await params;
    const data = await getSingleProduct(productid);
    if (!data.data) {
        return NotFound();
    }
    const product: Iproduct = data.data;
    const gallery = product.images?.length ? product.images : [product.imageCover];

    // Fetch related products (prefer same category, exclude currently viewed product)
    let relatedProducts: Iproduct[] = [];
    const categoryId = product.category?._id;
    if (categoryId) {
        try {
            const catData = await getAllProducts(undefined, categoryId);
            if (Array.isArray(catData?.data)) {
                relatedProducts = catData.data.filter((p: Iproduct) => p._id !== product._id);
            }
        } catch (err) {
            console.error("Error fetching category products:", err);
        }
    }

    // Fall back to general product catalog if category has fewer than 4 items
    if (relatedProducts.length < 4) {
        try {
            const allData = await getAllProducts();
            if (Array.isArray(allData?.data)) {
                const fallback = allData.data.filter(
                    (p: Iproduct) => p._id !== product._id && !relatedProducts.some((rp) => rp._id === p._id)
                );
                relatedProducts = [...relatedProducts, ...fallback];
            }
        } catch (err) {
            console.error("Error fetching fallback products:", err);
        }
    }

    const recommendedProducts = relatedProducts.slice(0, 4);

    return (
        <div className="mx-auto max-w-6xl  px-6 py-8">
            <Breadcrumb className="mb-6" aria-label="Breadcrumb">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
                <ImageGallery images={gallery} title={product.title} />

                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-md bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                            {product.category?.name}
                        </span>
                    </div>

                    <h1 className="mb-2 text-2xl font-extrabold text-gray-900">{product.title}</h1>

                    <div className="mb-3 flex items-center gap-2">
                        <div className="flex text-amber-500">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.round(product.ratingsAverage) ? "fill-current" : ""}`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                        </span>
                    </div>

                    <div className="mb-4 text-3xl font-extrabold text-gray-900">{product.price} EGP</div>

                    <div className="mb-5 flex items-center gap-1.5 text-sm font-medium text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-600" />
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                        <span className="text-gray-500">· {product.quantity} available</span>
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-gray-500">{product.description}</p>

                    <QuantityAndActions price={product.price} prodectid={productid} maxQuantity={product.quantity} />

                    <WishlistButton productId={product._id} />

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {TRUST_POINTS.map(({ Icon, label }) => (
                            <div key={label} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                                <Icon className="h-4 w-4 text-green-600" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ProductTabs product={product} />

            {recommendedProducts.length > 0 && (
                <div className="mt-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-extrabold text-gray-900">You May Also Like</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center sm:justify-items-stretch">
                        {recommendedProducts.map((recProduct: Iproduct) => (
                            <ProductCard product={recProduct} key={recProduct._id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}