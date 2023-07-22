import {
  CategoryModel,
  DolarModel,
  HistoryShoppingModel,
  ProductModel,
  ProductShoppingListModel,
  User,
} from './model'

export interface ResponseLogin {
  user: User
}
export interface ResponseError {
  message: string
}
export interface CloudinaryResponse {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: any[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  access_mode: string
  original_filename: string
}
export interface ResponseProductListHistory {
  message: string
  id: string
}
export interface ResponseCategoryWithProduct {
  products: CategoryModel[]
}
interface ResponseCreateProduct {
  product: ProductModel
}
export interface ResponseHistoryPending {
  history: HistoryShoppingModel
}
// [string, HistoryShoppingModel[]][]
interface HistoryShoppingModelWithMonth {
  [key: string]: HistoryShoppingModel[]
}
// 'JULIO-2023':HistoryShoppingModel[{}]con objectValues ['Julio-2023',HistoryShoppingModel[{}]][]
// type HistoryShoppingModelAll = [HistoryShoppingModelWithMonth][]

interface ResponseHistoryShoppingModelAll {
  history: HistoryShoppingModelWithMonth
}
interface ResponseHistoryUpdateCountProductShoppinList {
  product: Pick<ProductShoppingListModel, 'count' | 'id'>
}
export interface Message {
  message: string
}
export interface ResponseModal {
  dolar: DolarModel
}
