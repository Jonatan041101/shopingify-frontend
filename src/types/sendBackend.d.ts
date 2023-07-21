import { ProductModel, StockModel } from './model'

export interface CreateProductModel
  extends Omit<ProductModel, 'categoryId' | 'id'> {
  category: string
  price: string | number
  stock: Pick<StockModel, 'count'>
}
