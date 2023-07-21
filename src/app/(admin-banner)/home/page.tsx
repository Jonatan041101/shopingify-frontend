// import '../css/main.css'
import Products from '@/components/Main/Products'
import { getProductsWithCategory } from '@/utils/fetchApi'
export default async function Home() {
  const products = await getProductsWithCategory()
  // console.log({
  // products,
  // })
  // if (products?.products) {
  //   console.log('FUCNIONA', products.products[1].product[0].name)
  //   if (products.products.length > 0) {
  //     if (products.products[0].product.length > 0) {
  //       console.log(products.products[0].product[0].name)
  //     }
  //   }
  // }
  return (
    <main className="main">{products && <Products products={products} />}</main>
  )
}
