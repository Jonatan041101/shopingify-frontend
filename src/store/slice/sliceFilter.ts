import { Category } from '@/types/types'
import { StateCreator } from 'zustand'
export interface Filter {
  searchNameItemOrCategory: string
  items: Category[]
  copyItems: Category[]
  changeSearchName: (text: string) => void
  addItemsProducts: (items: Category[]) => void
  addItemsFiltered: (items: Category[]) => void
  deleteItems: (items: Category[]) => void
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
