export default function ProductLoading() {
    return (
        <div className="mx-auto max-w-6xl animate-pulse px-4 py-10">
            <div className="mb-8 h-4 w-48 rounded bg-gray-200" />

            <div className="grid gap-10 md:grid-cols-2">
                {/* الصور */}
                <div>
                    <div className="aspect-square rounded-2xl bg-gray-200" />
                    <div className="mt-4 flex gap-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-16 w-16 rounded-lg bg-gray-200" />
                        ))}
                    </div>
                </div>

                {/* التفاصيل */}
                <div className="space-y-4">
                    <div className="h-6 w-28 rounded-full bg-gray-200" />
                    <div className="h-8 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-40 rounded bg-gray-200" />
                    <div className="h-10 w-32 rounded bg-gray-200" />
                    <div className="h-20 rounded bg-gray-200" />
                    <div className="flex gap-3 pt-4">
                        <div className="h-12 flex-1 rounded-lg bg-gray-200" />
                        <div className="h-12 flex-1 rounded-lg bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}