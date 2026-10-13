import PageHero from '@/components/heropages/hero'
import CategorySection from '@/components/Homepage/CategorySection'
import { Layers } from 'lucide-react'

// Renders the categories page.
export default function page() {
  return (
    <>

<PageHero
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Categories" },
  ]}
  title="All Categories"
  description="Browse our wide range of product categories"
  icon={<Layers />}
/>
<CategorySection />
    </>
  )
}
