import { useBearStore } from '@/store/store'
import { addProductListHistory } from '@/utils/apiHistory'
import useAlert from './useAlert'
import { createBuyProduct } from '@/utils/convert'
import { Product } from '@/types/types'
import { addItemOrUpdate } from '@/store/operations/addItem'

export default function useAddItem() {
  const { historyId, historyListPending, addProductHistory } = useBearStore(
    (state) => state
  )
  const { createAlert } = useAlert()
  const addItemHistory = async (id: string, product: Product) => {
    console.log('producto')
    if (historyListPending) {
      const message = await addProductListHistory(historyId, id)
      console.log({ message })
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
        const newList = addItemOrUpdate(addProduct, historyListPending)
        addProductHistory(newList)
      }
    }
  }
  return {
    addItemHistory,
  }
}
