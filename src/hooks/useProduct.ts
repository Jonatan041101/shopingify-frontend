import { useBearStore } from '@/store/store'

import useAlert from './useAlert'
import useError from './useError'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import {
  deleteProductListHistory,
  updateCountProductListHistory,
} from '@/utils/api/productList'
import useCountProduct from './useCountProduct'

import useCount from './useCount'

export default function useProduct() {
  const { historyListPending, addItemList, addProductHistory } = useBearStore(
    (state) => state
  )
  const { deleteItemList } = useCountProduct()
  const { createAlert } = useAlert()
  const { handlerMsgErr } = useError()
  const { counterItem } = useCountProduct()
  const { verifyCount } = useCount()
  const handleUpdateProduct = async (
    count: number,
    productId: string,
    categoryName: string,
    listItems: ProductShoppingListWithCategoryClient[]
  ) => {
    const verify = verifyCount(listItems, categoryName, productId, count)
    if (!verify) return
    if (historyListPending) {
      try {
        const response = await updateCountProductListHistory(productId, count)

        if (response) {
          const newList = counterItem(
            listItems,
            response.product.count,
            response.product.id, //ID  del producto en productList
            categoryName,
            true
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
