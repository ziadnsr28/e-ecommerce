import Link from "next/link";
import { Filter, Tags, X } from "lucide-react";

export default function ActiveFilters({ brand }: { brand: string }) {
    return (
        <div className="mx-auto mb-4 mt-6 flex max-w-[1270px] items-center gap-3 px-4 text-sm">
            <span className="flex items-center gap-1 text-gray-600">
                <Filter size={14} /> Active Filters:
            </span>

            <span className="flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-purple-700">
                <Tags size={12} />
                {brand}
                <Link href="/products" aria-label="Remove filter">
                    <X size={12} />
                </Link>
            </span>

            <Link href="/products" className="text-gray-600 underline hover:text-green-600">
                Clear all
            </Link>
        </div>
    );
}