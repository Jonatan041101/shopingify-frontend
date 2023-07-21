import {
  CategoryWithProductClient,
  ProductShoppingListWithCategoryClient,
} from '@/types/parse'
type ValidTypes =
  | CategoryWithProductClient
  | ProductShoppingListWithCategoryClient
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
  category: ProductShoppingListWithCategoryClient,
  PRODUCT_ID: string
) => {
  const product = category.product.find(
    ({ id: productShoppingListId, product: { id: productId } }) =>
      productShoppingListId === PRODUCT_ID || productId === PRODUCT_ID
  )
  return { product }
}
