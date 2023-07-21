import { useBearStore } from '@/store/store'
import { addProductListHistory } from '@/utils/apiHistory'
import useAlert from './useAlert'
import { createBuyProduct } from '@/utils/convert'
import { Product } from '@/types/types'
import { addOrUpdateFromAllListToShoppingList } from '@/store/operations/addItem'

export default function useAddItem() {
  const { historyId, historyListPending, addProductHistory } = useBearStore(
    (state) => state
  )
  const { createAlert } = useAlert()
  const addItemHistory = async (id: string, product: Product) => {
    if (historyListPending) {
      const message = await addProductListHistory(historyId, id)
      if (message) {
        createAlert(`Producto ${product.name} agregado a lista `, false)
        const { newProduct } = createBuyProduct(product)
        const addProduct = {
          ...newProduct,
          product: {
            ...newProduct.product,
            id: message.id,
          },
        }
        const newList = addOrUpdateFromAllListToShoppingList(
          addProduct,
          historyListPending
        )
        addProductHistory(newList)
      }
    }
  }
  return {
    addItemHistory,
  }
}
