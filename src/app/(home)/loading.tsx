


export default function Loading() {
    return (
        <div className="animate-pulse">
            {/* Hero */}
            <div className="h-[500px] w-full bg-gray-200" />

            <div className="mx-auto max-w-[1560px] px-4">
                {/* Features */}
                <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-[92px] items-center gap-4 rounded-2xl border border-gray-100 p-5 shadow-sm"
                        >
                            <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-2/3 rounded bg-gray-200" />
                                <div className="h-3 w-1/2 rounded bg-gray-200" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Categories Header */}
                <div className="mb-6 mt-8 flex items-center justify-between">
                    <div className="h-8 w-60 rounded bg-gray-200" />
                    <div className="h-5 w-36 rounded bg-gray-200" />
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-[162px] flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 shadow-sm"
                        >
                            <div className="h-20 w-20 rounded-full bg-gray-200" />
                            <div className="h-4 w-24 rounded bg-gray-200" />
                        </div>
                    ))}
                </div>

                {/* Promo Banners */}
                <div className="my-12 grid gap-6 md:grid-cols-2">
                    <div className="h-72 rounded-3xl bg-gray-200" />
                    <div className="h-72 rounded-3xl bg-gray-200" />
                </div>

                {/* Featured Products Header */}
                <div className="mb-6 mt-20 h-8 w-64 rounded bg-gray-200" />

                {/* Products */}
                <div className="grid grid-cols-2 gap-5 pb-12 md:grid-cols-3 lg:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm"
                        >
                            {/* Product Image */}
                            <div className="h-[340px] bg-gray-200" />

                            {/* Product Info */}
                            <div className="space-y-3 p-4">
                                <div className="h-3 w-16 rounded bg-gray-200" />

                                <div className="h-4 w-3/4 rounded bg-gray-200" />

                                <div className="h-3 w-28 rounded bg-gray-200" />

                                <div className="flex items-center justify-between pt-1">
                                    <div className="h-5 w-20 rounded bg-gray-200" />
                                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
