import { ProductShoppingListWithCategoryClientOne } from '@/types/parse'
import { StateCreator } from 'zustand'

export interface ProductDetail {
  product: ProductShoppingListWithCategoryClientOne | null
  url: string
  updatingProduct: ProductShoppingListWithCategoryClientOne | null
  optionsUpdateProduct: (
    product: ProductShoppingListWithCategoryClientOne | null
  ) => void
  changeUrl: (url: string) => void
  viewProductDetail: (
    product: ProductShoppingListWithCategoryClientOne | null
  ) => void
}
export const productSlice: StateCreator<ProductDetail> = (set) => ({
  product: null,
  url: '',
  updatingProduct: null,
  optionsUpdateProduct: (updatingProduct) => {
    set((state) => ({ ...state, updatingProduct }))
  },
  changeUrl: (url) => {
    set((state) => ({ ...state, url }))
  },
  viewProductDetail: (product) => {
    set((state) => ({ ...state, product }))
  },
})
