import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-2 text-8xl font-extrabold text-green-600">404</h1>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Page Not Found</h2>
            <p className="mb-8 max-w-md text-gray-500">
                Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
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