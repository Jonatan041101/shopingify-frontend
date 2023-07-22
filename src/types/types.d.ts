import { Status } from './string'

export interface ProductHistory {
  productId: string
  count: number
}
export interface HistoryCreate {
  nameList: string
  status: Status
  productsList: ProductHistory[]
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
