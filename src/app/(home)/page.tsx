import React from 'react'
import HeroSection from '../../components/Homepage/sliderhome'
import CategorySection from '../../components/Homepage/CategorySection'
import PromoBannersSection from '../../components/Homepage/PromoBannersSection'
import NewsletterAppSection from '../../components/Homepage/NewsletterAppSection'
import AllCards from "@/components/product/AllCards";
// Renders the home page featuring hero slides, categories, promotions, and products.
export  default  function page() {

  return (
    <div>
      <HeroSection />
      <CategorySection />
      <PromoBannersSection />
      <h2 className="mb-6 flex pl-36 mt-20 items-center gap-2 text-2xl font-bold text-gray-900">
        <span className="h-6 w-1.5 rounded-full bg-emerald-600" />
        Featured <span className="text-emerald-600">Products</span>
      </h2>
      <AllCards />
      <NewsletterAppSection />
    </div>
  )
}
