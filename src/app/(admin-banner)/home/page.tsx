import Products from '@/components/Main/Products'
import { getProductsWithCategory } from '@/utils/api/product'
export default async function Home() {
  const products = await getProductsWithCategory()

  return (
    <main className="main">{products && <Products products={products} />}</main>
  )
}
