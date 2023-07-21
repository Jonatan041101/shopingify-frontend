import { CategoryWithProductClient } from '@/types/parse'
import { StateCreator } from 'zustand'
export interface Filter {
  searchNameItemOrCategory: string
  items: CategoryWithProductClient[]
  copyItems: CategoryWithProductClient[]
  changeSearchName: (text: string) => void
  addItemsProducts: (items: CategoryWithProductClient[]) => void
  addItemsFiltered: (items: CategoryWithProductClient[]) => void
  deleteItems: (items: CategoryWithProductClient[]) => void
}

export const sliceFilter: StateCreator<Filter> = (set) => ({
  searchNameItemOrCategory: '',
  items: [],
  copyItems: [],
  changeSearchName: (text) => {
    set((state) => ({ ...state, searchNameItemOrCategory: text }))
  },
  addItemsProducts: (items) => {
    set((state) => ({ ...state, items, copyItems: items }))
  },
  addItemsFiltered: (items) => {
    set((state) => ({ ...state, items }))
  },
  deleteItems: (items) => {
    set((state) => ({ ...state, items, copyItems: items }))
  },
})
