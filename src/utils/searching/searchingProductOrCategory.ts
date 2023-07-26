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
  products: T[],
  categoryName: string
) => {
  const newProductsList: T[] = [...products]
  const { category } = searchCategory<T>(newProductsList, categoryName)
  return {
    newProductsList,
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
