import { ProductShoppingListWithCategoryClient } from '@/types/parse'

export const getTotal = (
  products: ProductShoppingListWithCategoryClient[],
  dolar: number
) => {
  let total = 0
  products.forEach(({ product }) => {
    product.forEach(({ count, product }) => {
      let PRICE = product.price * dolar
      total += PRICE * count
    })
  })
  return total
}
