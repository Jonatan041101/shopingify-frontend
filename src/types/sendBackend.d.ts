import { ProductModel, StockModel } from './model'
export interface StockModelCountStringOrNumber
  extends Pick<StockModel, 'count'> {
  count: string | number
}
export interface CreateProductModel
  extends Omit<ProductModel, 'categoryId' | 'id'> {
  category: string
  price: string | number
  stock: StockModelCountStringOrNumber
}
