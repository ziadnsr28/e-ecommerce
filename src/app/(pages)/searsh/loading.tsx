import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

// Next.js App Router route-level loading state
export default function Loading() {
    return (
        <main className="bg-white text-slate-800">
            <div className="mx-auto max-w-6xl px-4 py-4">
                {/* Breadcrumb skeleton */}
                <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
                {/* Search input skeleton */}
                <div className="mt-3 h-10 max-w-sm rounded-lg bg-gray-100 animate-pulse" />

                <div className="mt-6 flex gap-6">
                    {/* Sidebar skeleton */}
                    <aside className="hidden w-40 shrink-0 space-y-4 lg:block">
                        <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
                        <div className="h-28 w-full rounded bg-gray-100 animate-pulse" />
                    </aside>

                    {/* Products grid skeleton */}
                    <section className="flex-1">
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <ProductCardSkeleton key={item} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
