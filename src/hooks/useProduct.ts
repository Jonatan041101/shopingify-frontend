import { counterItem } from '@/store/operations/addItem'
import { deleteItemList } from '@/store/operations/deleteItem'
import { useBearStore } from '@/store/store'
import {
  deleteProductListHistory,
  updateCountProductListHistory,
} from '@/utils/apiHistory'
import useAlert from './useAlert'
import useError from './useError'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'

export default function useProduct() {
  const { historyListPending, addItemList, addProductHistory } = useBearStore(
    (state) => state
  )
  const { createAlert } = useAlert()
  const { handlerMsgErr } = useError()
  const handleUpdateProduct = async (
    count: number,
    productId: string,
    categoryName: string,
    listItems: ProductShoppingListWithCategoryClient[]
  ) => {
    if (historyListPending) {
      try {
        const response = await updateCountProductListHistory(productId, count)
        if (response) {
          const newList = counterItem(
            listItems,
            response.product.count,
            response.product.id, //ID  del producto en productList
            categoryName
          )
          addProductHistory(newList)
        }
      } catch (error) {
        handlerMsgErr(error)
      }
    } else {
      const newList = counterItem(listItems, count, productId, categoryName)
      addItemList(newList)
    }
  }
  const deleteItem = async (
    productId: string,
    categoryName: string,
    listItems: ProductShoppingListWithCategoryClient[]
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
      handlerMsgErr(error)
    }
  }
  return {
    handleUpdateProduct,
    deleteItem,
  }
}
