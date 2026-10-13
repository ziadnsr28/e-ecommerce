import Image from "next/image";
import { ArrowLeft, Package } from "lucide-react";
import AllCards from "@/components/product/AllCards";
import { getSingleBrand } from "@/services/brinds.servies";
import { getSingleCategory } from "@/services/Gategory.service";
import PageHero from "@/components/heropages/hero";
import ActiveFilters from "@/components/brands/ActiveFilters";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; category?: string }>;
}) {
  const { brand, category } = await searchParams;
  const brandData = brand ? (await getSingleBrand(brand)).data : null;
  const categoryData = category ? (await getSingleCategory(category)).data : null;

  return (
    <>
      {brandData ? (
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Brands", href: "/brands" },
            { label: brandData.name },
          ]}
          title={brandData.name}
          description={`Shop ${brandData.name} products`}
          icon={
            <Image src={brandData.image} alt={brandData.name} fill sizes="48px" className="object-contain p-1" />
          }
        />
      ) : categoryData ? (
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: categoryData.name },
          ]}
          title={categoryData.name}
          description={`Shop ${categoryData.name} products`}
          icon={
            <Image src={categoryData.image} alt={categoryData.name} fill sizes="48px" className="object-cover" />
          }
        />
      ) : (
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "All Products" }]}
          title="All Products"
          description="Explore our complete product collection"
          icon={<Package />}
        />
      )} 
        {categoryData && (
        <div className="mx-auto max-w-[1270px] px-4 pt-6 pb-2">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
        </div>
      )}

      {brandData && <ActiveFilters brand={brandData.name} />}
      <AllCards brand={brand} category={category} />
    </>
  );
}