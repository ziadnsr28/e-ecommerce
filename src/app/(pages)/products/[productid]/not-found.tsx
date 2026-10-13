import Link from "next/link";
export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-5xl">
                🔍
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Product Not Found</h1>
            <p className="mb-8 max-w-md text-gray-500">
                Sorry, the product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Link
                    href="/"
                    className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    Back to Home
                </Link>
                <Link
                    href="/products"
                    className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                    Browse Products
                </Link>
            </div>
        </div>
    );
}