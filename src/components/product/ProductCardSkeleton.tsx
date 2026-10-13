// Renders a single pulsing placeholder matching ProductCard dimensions
export default function ProductCardSkeleton() {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-3 animate-pulse">
            {/* Image placeholder */}
            <div className="aspect-[4/5] w-full rounded-lg bg-gray-200" />
            {/* Brand placeholder */}
            <div className="mt-3 h-3 w-1/3 rounded bg-gray-200" />
            {/* Title placeholder */}
            <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
            {/* Price & action placeholder */}
            <div className="mt-4 flex items-center justify-between">
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
        </div>
    );
}
