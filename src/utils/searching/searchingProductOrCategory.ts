import { Category, ListBuy } from '@/types/types'
type ValidTypes = Category | ListBuy
export const searchCategory = <T extends ValidTypes>(
  newItems: T[],
  categoryName: string
) => {
  const category = newItems.find((item) => item.category === categoryName)
  return {
    category,
  }
}

export const newProductToAdd = <T extends ValidTypes>(
  items: T[],
  categoryName: string
) => {
  const newItems: T[] = [...items]
  const { category } = searchCategory<T>(newItems, categoryName)
  // const category = newItems.find(({ name }) => name === categoryName)
  return {
    newItems,
    category,
  }
}
export const searchingProductWithID = (
  category: ListBuy,
  PRODUCT_ID: string
) => {
  const product = category.product.find(
    ({ id, productId }) => productId === PRODUCT_ID || id === PRODUCT_ID
  )
  return { product }
}
