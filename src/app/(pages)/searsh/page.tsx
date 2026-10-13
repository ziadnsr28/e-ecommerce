// This page gets real products from the API,
// lets the user search and filter them by category, brand, and price,
// then displays the matching products using the shared ProductCard component with pagination.
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Search,
    LayoutGrid,
    List,
    SlidersHorizontal,
    X,
} from "lucide-react";
import ProductCard from "@/components/product/productcard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import Pagination from "@/components/search/Pagination";
import { getAllProducts } from "@/services/allproduct.service";
import { Daum } from "@/types/product";

// The category names shown in the filters
const categories = ["Music", "Men's Fashion", "Women's Fashion", "SuperMarket", "Baby & Toys", "Home", "Books", "Beauty & Health"];

// The brand names shown in the filters
const brands = ["Canon", "Dell", "Lenovo", "SONY", "Infinix", "Realme", "HONOR", "Nokia"];

// Takes a list and an item.
// If the item is already in the list, it returns a new list WITHOUT the item (unchecked).
// If the item is not in the list, it returns a new list WITH the item (checked).
function toggleItem(list: string[], item: string) {
    if (list.includes(item)) {
        return list.filter((x) => x !== item);
    } else {
        return [...list, item];
    }
}

export default function ProductsPage() {
    const searchParams = useSearchParams();

    // All real products we get from the API
    const [allProducts, setAllProducts] = useState<Daum[]>([]);
    // True while we are waiting for the API to send products
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Text the user types in the search box (initialized from URL search param if present)
    const [searchTerm, setSearchTerm] = useState(() => searchParams.get("search") || "");
    // The categories the user checked
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    // The brands the user checked
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    // The price inputs (kept as text because they come from <input>)
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    // The selected sort option: "relevance", "low" or "high"
    const [sort, setSort] = useState("relevance");
    // Current page number for pagination (starts at page 1)
    const [currentPage, setCurrentPage] = useState<number>(1);
    // Is the mobile filter panel open?
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Keep state in sync with URL search query parameter changes
    const urlQuery = searchParams.get("search") || "";
    const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
    if (urlQuery !== prevUrlQuery) {
        setPrevUrlQuery(urlQuery);
        setSearchTerm(urlQuery);
        setCurrentPage(1);
    }
    // ----- FETCH PRODUCTS -----
    // Get products from the API when the page opens
    useEffect(() => {
        async function loadProducts() {
            try {
                setIsLoading(true);
                const res = await getAllProducts();
                setAllProducts(res.data);
            } catch (error) {
                console.error("Failed to load products:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts();
    }, []);

    // ----- FILTERING -----

    // Keep only the products that match the selected filters
    const filteredProducts = allProducts.filter((product) => {
        // 1. Search by title (case-insensitive)
        if (searchTerm.trim() !== "") {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim());
            if (!matchesSearch) {
                return false;
            }
        }
        // 2. Category filter: only runs if the user checked at least one category
        if (selectedCategories.length > 0) {
            if (!selectedCategories.includes(product.category?.name)) {
                return false;
            }
        }
        // 3. Brand filter: only runs if the user checked at least one brand
        if (selectedBrands.length > 0) {
            if (!selectedBrands.includes(product.brand?.name)) {
                return false;
            }
        }
        // The actual selling price (discount price if available, otherwise original price)
        const sellingPrice = product.priceAfterDiscount ?? product.price;
        // 4. Min price filter
        if (minPrice !== "") {
            if (sellingPrice < Number(minPrice)) {
                return false;
            }
        }
        // 5. Max price filter
        if (maxPrice !== "") {
            if (sellingPrice > Number(maxPrice)) {
                return false;
            }
        }
        // The product passed all checks, so keep it
        return true;
    });
    // ----- SORTING -----
    // Make a copy of the filtered products before sorting
    const sortedProducts = [...filteredProducts];
    // Sort by price: low to high
    if (sort === "low") {
        sortedProducts.sort((a, b) => {
            const priceA = a.priceAfterDiscount ?? a.price;
            const priceB = b.priceAfterDiscount ?? b.price;
            return priceA - priceB;
        });
    }
    // Sort by price: high to low
    if (sort === "high") {
        sortedProducts.sort((a, b) => {
            const priceA = a.priceAfterDiscount ?? a.price;
            const priceB = b.priceAfterDiscount ?? b.price;
            return priceB - priceA;
        });
    }
    // ----- PAGINATION (12 products per page) -----
    const productsPerPage = 12;
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);
    // ----- FILTERS UI -----
    // The same filters UI is used in the desktop sidebar and in the mobile panel
    const filters = (
        <div className="w-full text-slate-700">
            {/* Categories */}
            <h3 className="text-[10px] font-semibold text-slate-800">Categories</h3>
            <div className="mt-2 max-h-[116px] space-y-[3px] overflow-y-auto pr-1">
                {categories.map((item) => (
                    <label key={item} className="flex cursor-pointer items-center gap-1.5 text-[8px] leading-[11px] text-slate-500">
                        <input
                            type="checkbox"
                            className="h-2.5 w-2.5 rounded-[2px] border-slate-300 accent-green-600"
                            checked={selectedCategories.includes(item)}
                            onChange={() => {
                                setSelectedCategories(toggleItem(selectedCategories, item));
                                setCurrentPage(1);
                            }}
                        />
                        {item}
                    </label>
                ))}
            </div>
            {/* Price Range */}
            <h3 className="mt-5 text-[10px] font-semibold text-slate-800">Price Range</h3>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
                <div>
                    <p className="mb-1 text-[8px] leading-none text-slate-400">Min (EGP)</p>
                    <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => {
                            setMinPrice(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-5 w-full rounded-[2px] border border-slate-200 bg-white px-1.5 text-[8px] text-slate-600 outline-none placeholder:text-slate-300 focus:border-green-500"
                    />
                </div>
                <div>
                    <p className="mb-1 text-[8px] leading-none text-slate-400">Max (EGP)</p>
                    <input
                        type="number"
                        placeholder="No limit"
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-5 w-full rounded-[2px] border border-slate-200 bg-white px-1.5 text-[8px] text-slate-600 outline-none placeholder:text-slate-300 focus:border-green-500"
                    />
                </div>
            </div>
            {/* Quick buttons that set the max price */}
            <div className="mt-2 flex flex-wrap gap-1">
                <button
                    onClick={() => {
                        setMaxPrice("500");
                        setCurrentPage(1);
                    }}
                    className="h-4 rounded-[2px] border border-slate-200 bg-slate-50 px-1.5 text-[8px] leading-none text-slate-500"
                >
                    Under 500
                </button>
                <button
                    onClick={() => {
                        setMaxPrice("1000");
                        setCurrentPage(1);
                    }}
                    className="h-4 rounded-[2px] border border-slate-200 bg-slate-50 px-1.5 text-[8px] leading-none text-slate-500"
                >
                    Under 1K
                </button>
                <button
                    onClick={() => {
                        setMaxPrice("10000");
                        setCurrentPage(1);
                    }}
                    className="h-4 rounded-[2px] border border-slate-200 bg-slate-50 px-1.5 text-[8px] leading-none text-slate-500"
                >
                    Under 10K
                </button>
            </div>

            {/* Brands */}
            <h3 className="mt-5 text-[10px] font-semibold text-slate-800">Brands</h3>
            <div className="mt-2 max-h-[116px] space-y-[3px] overflow-y-auto pr-1">
                {brands.map((item) => (
                    <label key={item} className="flex cursor-pointer items-center gap-1.5 text-[8px] leading-[11px] text-slate-500">
                        <input
                            type="checkbox"
                            className="h-2.5 w-2.5 rounded-[2px] border-slate-300 accent-green-600"
                            checked={selectedBrands.includes(item)}
                            onChange={() => {
                                setSelectedBrands(toggleItem(selectedBrands, item));
                                setCurrentPage(1);
                            }}
                        />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );

    // ----- MAIN UI -----

    return (
        <main className="bg-white text-slate-800">
            <div className="mx-auto max-w-6xl px-4 py-4">
                {/* Breadcrumb */}
                <p className="text-[10px] text-gray-500">
                    Home <span className="mx-1">/</span>
                    <span className="text-gray-800">Search Results</span>
                </p>

                {/* Search box */}
                <div className="mt-3 flex h-10 max-w-sm items-center gap-2 rounded-lg border border-gray-200 px-3">
                    <Search className="h-3.5 w-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full text-xs outline-none placeholder-gray-400"
                    />
                </div>

                <div className="mt-6 flex gap-6">
                    {/* Desktop sidebar (hidden on small screens) */}
                    <aside className="hidden w-40 shrink-0 border-r border-slate-100 pr-5 lg:block">{filters}</aside>

                    <section className="flex-1">
                        {/* Top bar: Filters button (mobile), view buttons, and sorting */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {/* This button opens the mobile filter panel */}
                                <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[10px] lg:hidden">
                                    <SlidersHorizontal className="h-3 w-3" />
                                    Filters
                                </button>
                                <button className="flex h-6 w-6 items-center justify-center rounded bg-green-600 text-white">
                                    <LayoutGrid className="h-3 w-3" />
                                </button>
                                <button className="flex h-6 w-6 items-center justify-center text-gray-400">
                                    <List className="h-3 w-3" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                Sort by
                                <select
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-6 rounded border border-gray-200 bg-white px-2 text-[10px] text-gray-800"
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="low">Price: Low to High</option>
                                    <option value="high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Loading skeletons while fetching products from API */}
                        {isLoading ? (
                            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <ProductCardSkeleton key={item} />
                                ))}
                            </div>
                        ) : sortedProducts.length === 0 ? (
                            /* Message shown when no product matches the filters */
                            <p className="mt-10 text-center text-xs text-gray-500">No products found.</p>
                        ) : (
                            /* Show the 12 products of the current page */
                            <>
                                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                                    {currentProducts.map((product) => (
                                        <ProductCard product={product} key={product._id} />
                                    ))}
                                </div>

                                {/* Dynamic pagination */}
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => {
                                        setCurrentPage(page);
                                    }}
                                />
                            </>
                        )}
                    </section>
                </div>
            </div>

            {/* Mobile filter panel: only shown when filtersOpen is true */}
            {filtersOpen && (
                <div className="fixed inset-0 z-50 flex bg-black/40 lg:hidden">
                    <div className="h-full w-72 overflow-y-auto bg-white p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-bold">Filters</h2>
                            {/* Close button */}
                            <button onClick={() => setFiltersOpen(false)}><X className="h-4 w-4" /></button>
                        </div>

                        {filters}

                        <button onClick={() => setFiltersOpen(false)} className="mt-6 h-9 w-full rounded-lg bg-green-600 text-xs font-semibold text-white">Show results</button>
                    </div>

                    {/* The dark area next to the panel: clicking it also closes the panel */}
                    <div className="flex-1" onClick={() => setFiltersOpen(false)} />
                </div>
            )}
        </main>
    );
}