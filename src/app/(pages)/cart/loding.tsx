export function CartSkeleton() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/* Header */}
            <div className="mb-6 flex animate-pulse items-center gap-2">
                <div className="h-6 w-6 rounded bg-gray-200" />
                <div className="h-6 w-40 rounded bg-gray-200" />
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                {/* Left: cart items */}
                <div className="flex-1 rounded-xl border border-gray-100 bg-white">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="flex animate-pulse items-center gap-5 border-b border-gray-100 p-4 last:border-b-0 sm:p-5"
                        >
                            {/* image */}
                            <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-200 sm:h-24 sm:w-24" />

                            {/* title */}
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className="h-4 w-1/3 rounded bg-gray-200" />
                            </div>

                            {/* price (desktop) */}
                            <div className="hidden w-24 flex-shrink-0 sm:block">
                                <div className="h-4 w-16 rounded bg-gray-200" />
                            </div>

                            {/* stepper */}
                            <div className="h-8 w-24 flex-shrink-0 rounded-full bg-gray-200" />

                            {/* line total + trash */}
                            <div className="flex flex-shrink-0 items-center gap-4">
                                <div className="h-4 w-16 rounded bg-gray-200" />
                                <div className="h-8 w-8 rounded-full bg-gray-200" />
                            </div>
                        </div>
                    ))}

                    {/* footer links */}
                    <div className="flex animate-pulse items-center justify-between p-4 sm:p-5">
                        <div className="h-4 w-28 rounded bg-gray-200" />
                        <div className="h-4 w-24 rounded bg-gray-200" />
                    </div>
                </div>

                {/* Right: order summary */}
                <div className="w-full flex-shrink-0 animate-pulse rounded-xl border border-gray-100 bg-white p-5 lg:w-80">
                    <div className="mb-4 h-5 w-32 rounded bg-gray-200" />
                    <div className="mb-4 h-4 w-24 rounded bg-gray-200" />

                    <div className="mb-4 h-16 w-full rounded-lg bg-gray-200" />

                    <div className="space-y-3 border-t border-gray-100 py-4">
                        <div className="flex justify-between">
                            <div className="h-4 w-16 rounded bg-gray-200" />
                            <div className="h-4 w-16 rounded bg-gray-200" />
                        </div>
                        <div className="flex justify-between">
                            <div className="h-4 w-16 rounded bg-gray-200" />
                            <div className="h-4 w-12 rounded bg-gray-200" />
                        </div>
                    </div>

                    <div className="flex justify-between border-t border-gray-100 py-4">
                        <div className="h-5 w-14 rounded bg-gray-200" />
                        <div className="h-5 w-20 rounded bg-gray-200" />
                    </div>

                    <div className="mb-4 h-10 w-full rounded-lg bg-gray-200" />
                    <div className="h-11 w-full rounded-lg bg-gray-300" />
                </div>
            </div>
        </div>
    );
}