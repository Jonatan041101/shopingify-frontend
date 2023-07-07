import { BuyProduct } from '@/types/types'
import { StateCreator } from 'zustand'

export interface ProductDetail {
  product: BuyProduct | null
  url: string
  changeUrl: (url: string) => void
  viewProductDetail: (product: BuyProduct | null) => void
}
export const productSlice: StateCreator<ProductDetail> = (set) => ({
  product: null,
  url: '',
  changeUrl: (url) => {
    set((state) => ({ ...state, url }))
  },
  viewProductDetail: (product) => {
    set((state) => ({ ...state, product }))
  },
})
