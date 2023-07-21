export interface User {
  id: string
  user: string
  password: string
  readonly admin: number
}
export type UserNonPassword = Omit<User, 'password'>
export interface StockModel {
  id: string
  count: number
}
export interface ProductModel {
  id: string
  name: string
  note: string
  image: string
  categoryId: string
  price: number
  category: CategoryModel
  stock: StockModel
}
export interface CategoryModel {
  id: string
  name: string
  product: ProductModel[]
}
export interface ProductShoppingListModel {
  id: string
  count: number
  product: ProductModel
}
