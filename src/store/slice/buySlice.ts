import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import { StateCreator } from 'zustand'

export interface List {
  list: ProductShoppingListWithCategoryClient[]
  nameList: string
  changeNameList: (nameList: string) => void
  deleteListBuy: () => void
  addItemList: (buy: ProductShoppingListWithCategoryClient[]) => void
}

export const buySlice: StateCreator<List> = (set) => ({
  list: [],
  nameList: '',
  changeNameList: (nameList) => {
    set((state) => ({ ...state, nameList }))
  },
  deleteListBuy: () => {
    set((state) => ({ ...state, list: [], nameList: '' }))
  },
  addItemList: (newBuy) => {
    set((state) => ({
      ...state,
      list: newBuy,
    }))
  },
})
