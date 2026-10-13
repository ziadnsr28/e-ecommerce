import Link from "next/link";
import { Package } from "lucide-react";
import { getAllProducts } from "@/services/allproduct.service";
import ProductCard from "./productcard";
import { Daum } from "@/types/product";

export default async function AllCards({
  showCount = false,
  brand,
  category,
}: {
  brand?: string;
  category?: string;
  showCount?: boolean;
}) {
  const data = await getAllProducts(brand, category);
  const products: Daum[] = data.data;

  return (
    <div className="mx-auto max-w-[1270px] px-4">
      {showCount && (
        <p className="mb-4 text-xs text-gray-500">
          Showing {products.length} products
        </p>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-gray-100">
            <Package size={30} className="text-gray-400" />
          </div>

          <h3 className="mt-6 text-lg font-bold leading-6 text-slate-900">
            No Products Found
          </h3>

          <p className="mt-2 text-base leading-6 text-gray-500">
            No products match your current filters.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex h-12 w-[180px] items-center justify-center rounded-xl bg-green-600 text-base font-semibold text-white transition hover:bg-green-700"
          >
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-content-center gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}