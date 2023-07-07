export interface GetProduct {
  products: Category[]
}

export interface Category {
  id: string
  name: string
  product: ProductCount[]
}

export interface Product {
  categoryId: string
  id: string
  image: string
  name: string
  note: string
  category: CategoryName
}
export interface ProductCount extends Product {
  count?: number
}
export interface ProductList extends Product {
  count: number
}
export interface ListBuy {
  category: string
  id: string
  product: ProductList[]
}
export interface BuyProduct extends ListBuy {
  product: ProductList
}
export interface NewItem {
  categoryName: string
  image: string
  name: string
  note: string
}
export interface CategoryName extends Omit<Category, 'product'> {}
export type InputChange = 'categoryName' | 'image' | 'name' | 'note'
export interface ProductHistory {
  productId: string
  count: number
}
export type Status = 'Pendiente' | 'Completado' | 'Cancelado'
export interface HistoryCreate {
  nameList: string
  status: Status
  productsList: ProductHistory[]
}

export interface HistoryGet {
  history: History
}
interface History {
  [key: string]: HistoryItem[]
}
export interface HistoryPending {
  history: HistoryItem
}
export interface HistoryItem {
  date: Date
  id: string
  name: string
  status: string
  product: ProductElement[]
}

export interface ProductElement {
  count: number
  historyId: string
  id: string
  product: Product
  productId: string
}
export interface CategoryHistory extends Category {
  product: ProductElement[]
}
export interface ResUpdateList {
  product: ProductElement
}
export interface ProductCategoryStat {
  categoryStat100: number
  categoryStats: Stat[]
  productsStat100: number
  productsStats: Stat[]
}

export interface Stat {
  count: number
  id: string
  name: string
}
