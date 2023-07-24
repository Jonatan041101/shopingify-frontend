import { ProductModel, StockModel } from './model'
export interface StockModelCountStringOrNumber
  extends Pick<StockModel, 'count'> {
  id?: string
  count: string | number
}
export interface CreateProductModel
  extends Omit<ProductModel, 'categoryId' | 'id'> {
  id?: string
  category: string
  price: string | number
  stock: StockModelCountStringOrNumber
}
export interface ProductStock {
  productId: string
  count: number
}
