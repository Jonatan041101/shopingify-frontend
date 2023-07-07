import '../css/main.css'
import Products from '@/components/Main/Products'
import { getProductsWithCategory } from '@/utils/fetchApi'
export default async function Home() {
  const products = await getProductsWithCategory()

  return (
    <main className="main">
      <Products products={products} />
    </main>
  )
}
