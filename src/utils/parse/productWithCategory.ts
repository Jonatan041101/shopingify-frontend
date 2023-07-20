import { Category, NewItem, Product } from '@/types/types'

export const parseProductToAdd = (product: NewItem) => {
  const NEW_PRODUCT: NewItem = {
    ...product,
    stock: Number(product.stock) ?? 0,
    price: Number(product.price) ?? 0,
  }
  return {
    NEW_PRODUCT,
  }
}
export const parseCategoryToAdd = (product: Product) => {
  const newCategoryWithProduct: Category = {
    name: product.category.name,
    id: product.category.id,
    product: [product],
  }
  return {
    newCategoryWithProduct,
  }
}
