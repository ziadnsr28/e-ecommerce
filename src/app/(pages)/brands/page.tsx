"use client";
import PageHero from "@/components/heropages/hero";
import { getbrands } from "@/services/brinds.servies";
// File purpose:
// This file displays the Brands page with a hero section and a list of brands.
import { IBrand } from "@/types/brand";
import { ArrowRight, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Function purpose:
// Displays the Brands page and shows the page header and brand cards.
export default function BrandsPage() {
  const [brands, setbrands] = useState<IBrand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    async function addproduct() {
      try {
        setIsLoading(true);
        const data = await getbrands();
        console.log(data.data);
        setbrands(data?.data || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setIsLoading(false);
      }
    }
    addproduct();
  }, []);
  return (
    <>
      <PageHero
        theme="purple"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        title="Top Brands"
        description="Shop from your favorite brands"
        icon={<Tags />}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand: IBrand, i: number) => (
            <Link
              href={`/products?brand=${brand._id}`}
              key={i}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-200
                 bg-white p-3 pb-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
            >
              <div className="relative h-28 w-full rounded-xl ">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="rounded-lg object-contain p-3"
                />
              </div>

              <span className="text-sm font-semibold text-gray-800 transition-colors group-hover:text-purple-600">
                {brand.name}
              </span>

              <span
                className="flex items-center gap-1 text-xs font-medium text-purple-600
                 translate-y-1 opacity-0 transition duration-300
                 group-hover:translate-y-0 group-hover:opacity-100"
              >
                View Products <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

