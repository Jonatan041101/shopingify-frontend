import { CategoryModel, ProductShoppingListModel } from './model'
interface ParseOfNameToCategory {
  category: string
}
export interface CategoryWithProductClient
  extends Omit<CategoryModel, 'name'>,
    ParseOfNameToCategory {}

export interface CategoryInHistoryClient
  extends Omit<CategoryModel, 'name'>,
    ParseOfNameToCategory {
  product: ProductShoppingListModel[]
}

export interface CategoryWithNameOnly
  extends Pick<CategoryModel, 'id'>,
    ParseOfNameToCategory {}

export interface ProductShoppingListWithCategoryClient
  extends ParseOfNameToCategory {
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
