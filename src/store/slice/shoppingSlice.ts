import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import { StateCreator } from 'zustand'

export interface Shopping {
  shoppinList: ProductShoppingListWithCategoryClient[]
  nameList: string
  changeNameList: (nameList: string) => void
  deleteListBuy: () => void
  addItemList: (buy: ProductShoppingListWithCategoryClient[]) => void
}

export const buySlice: StateCreator<Shopping> = (set) => ({
  shoppinList: [],
  nameList: '',
  changeNameList: (nameList) => {
    set((state) => ({ ...state, nameList }))
  },
  deleteListBuy: () => {
    set((state) => ({ ...state, shoppinList: [], nameList: '' }))
  },
  addItemList: (newBuy) => {
    set((state) => ({
      ...state,
      shoppinList: newBuy,
    }))
  },
})
