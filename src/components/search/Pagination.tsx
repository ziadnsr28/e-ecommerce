import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

// Renders dynamic page number buttons and Next/Previous controls
export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    // If there is 1 page or 0 pages, do not display pagination
    if (totalPages <= 1) return null;

    // Create an array like [1, 2, 3] based on totalPages
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs">
            {/* Previous button */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dynamic page numbers */}
            {pages.map((page) => {
                const isActive = page === currentPage;
                return (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg font-medium transition ${
                            isActive
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next button */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
