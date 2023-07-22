import { CategoryWithProductClient } from '@/types/parse'
import { StateCreator } from 'zustand'
export interface Filter {
  searchNameItemOrCategory: string
  products: CategoryWithProductClient[]
  copyProducts: CategoryWithProductClient[]
  changeSearchName: (text: string) => void
  addItemsProducts: (items: CategoryWithProductClient[]) => void
  addItemsFiltered: (items: CategoryWithProductClient[]) => void
  deleteProducts: (items: CategoryWithProductClient[]) => void
}

export const sliceFilter: StateCreator<Filter> = (set) => ({
  searchNameItemOrCategory: '',
  products: [],
  copyProducts: [],
  changeSearchName: (text) => {
    set((state) => ({ ...state, searchNameItemOrCategory: text }))
  },
  addItemsProducts: (items) => {
    set((state) => ({ ...state, products: items, copyProducts: items }))
  },
  addItemsFiltered: (items) => {
    set((state) => ({ ...state, products: items }))
  },
  deleteProducts: (items) => {
    set((state) => ({ ...state, products: items, copyProducts: items }))
  },
})
