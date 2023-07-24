import { ProductShoppingListWithCategoryClientOne } from '@/types/parse'
import { CreateProductModel } from '@/types/sendBackend'

export const parseProductModel = (
  updatingProduct: ProductShoppingListWithCategoryClientOne
) => {
  const replaceProduct: CreateProductModel = {
    id: updatingProduct.product.product.id,
    category: updatingProduct.category,
    image: updatingProduct.product.product.image,
    name: updatingProduct.product.product.name,
    note: updatingProduct.product.product.note,
    price: Math.floor(updatingProduct.product.product.price * 525),
    stock: {
      id: updatingProduct.product.product.stock.id,
      count: updatingProduct.product.product.stock.count,
    },
  }
  return {
    replaceProduct,
  }
}
