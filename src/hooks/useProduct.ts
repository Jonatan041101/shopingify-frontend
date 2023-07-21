import { counterItem } from '@/store/operations/addItem'
import { deleteItemList } from '@/store/operations/deleteItem'
import { useBearStore } from '@/store/store'
import {
  deleteProductListHistory,
  updateCountProductListHistory,
} from '@/utils/apiHistory'
import useAlert from './useAlert'
import { ListBuy } from '@/types/types'

export default function useProduct() {
  const { historyListPending, addItemList, addProductHistory } = useBearStore(
    (state) => state
  )
  const { createAlert } = useAlert()

  const handleUpdateProduct = async (
    count: number,
    productId: string,
    categoryName: string,
    listItems: ListBuy[]
  ) => {
    console.log({ productId })

    if (historyListPending) {
      try {
        const response = await updateCountProductListHistory(productId, count)
        console.log({ response })
        const newList = counterItem(listItems, count, productId, categoryName)
        addProductHistory(newList)
        return
      } catch (error) {
        console.log({ error })
      }
    }
    const newList = counterItem(listItems, count, productId, categoryName)
    addItemList(newList)
  }
  const deleteItem = async (
    productId: string,
    categoryName: string,
    listItems: ListBuy[]
  ) => {
    try {
      if (historyListPending) {
        const response = await deleteProductListHistory(productId)
        const newList = deleteItemList(listItems, categoryName, productId)
        if (response) {
          createAlert(response.message, false)
        }
        addProductHistory(newList)
        return
      }
      const newList = deleteItemList(listItems, categoryName, productId)
      addItemList(newList)
    } catch (error) {
      const ERROR = error as Error
      createAlert(ERROR.message, true)
    }
  }
  return {
    handleUpdateProduct,
    deleteItem,
  }
}
