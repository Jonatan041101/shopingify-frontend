import { CategoryModel, ProductModel, User } from './model'

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
