import { ProductModel, ProductShoppingListModel } from '@/types/model'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'

export const parseHistoryShoppingModelToProductoShooping = (
  id: string,
  category: string
) => {
  const categoryList: ProductShoppingListWithCategoryClient = {
    id,
    category: category,
    product: [],
  }
  return { categoryList }
}
export const craeteProductShoppingModel = (
  count: number,
  id: string,
  product: ProductModel
) => {
  const newProductList: ProductShoppingListModel = {
    count,
    id,
    product,
  }
  return newProductList
}
