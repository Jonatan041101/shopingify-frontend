import { CategoryModel, ProductShoppingListModel } from './model'

export interface CategoryWithProductClient extends Omit<CategoryModel, 'name'> {
  category: string
}
export interface ProductShoppingListWithCategoryClient {
  category: string
  id: string
  product: ProductShoppingListModel[]
}
export interface ProductShoppingListOne {
  product: ProductShoppingListModel
}
export type ProductShoppingListWithCategoryClientOne = Omit<
  ProductShoppingListWithCategoryClient,
  'product'
> &
  ProductShoppingListOne
