import { ProductModel } from '@/types/model'
import { CategoryWithProductClient } from '@/types/parse'
import { CreateProductModel } from '@/types/sendBackend'

export const parseProductToAdd = (product: CreateProductModel) => {
  const NEW_PRODUCT: CreateProductModel = {
    ...product,
    category: product.category,
    stock: {
      count: Number(product.stock) ?? 0,
    },
    price: Number(product.price) ?? 0,
  }
  console.log({ NEW_PRODUCT })

  return {
    NEW_PRODUCT,
  }
}
export const parseCategoryToAdd = (product: ProductModel) => {
  const newCategoryWithProduct: CategoryWithProductClient = {
    category: product.category.name,
    id: product.category.id,
    product: [product],
  }
  return {
    newCategoryWithProduct,
  }
}
