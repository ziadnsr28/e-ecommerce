import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCategories } from "@/services/Gategory.service";
import { ICategory } from "@/types/category";

// Fetches and renders a responsive grid of product categories with navigational links.
export default async function CategorySection() {
    const data = await getAllCategories();
    const categoriesData: ICategory[] = data.data;
       console.log(categoriesData);
    return (
        <section className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                    <span className="h-6 w-1.5 rounded-full bg-emerald-600" />
                    Shop By <span className="text-emerald-600">Category</span>
                </h2>

                <Link
                    href="/categories"
                    className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
                >
                    View All Categories
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {categoriesData.map((category) => (
                    <Link
                        key={category._id}
                        href={`/products?category=${category._id}`}
                        className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md hover:-translate-y-1 hover:border-gray-200"
                    >
                        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <p className="text-center text-sm font-medium text-gray-800">
                            {category.name}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}