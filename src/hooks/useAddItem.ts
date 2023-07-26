import { useBearStore } from '@/store/store'
import useAlert from './useAlert'
import { parseProductModelToProductShoppingListWithCategoryClientOne } from '@/utils/parse/parseShoppingList'
import { ProductModel } from '@/types/model'
import { addProductListHistory } from '@/utils/api/productList'
import useCountProduct from './useCountProduct'
import useCount from './useCount'

export default function useAddItem() {
  const { historyId, historyListPending, addProductHistory } = useBearStore(
    (state) => state
  )
  const { addOrUpdateFromAllListToShoppingList } = useCountProduct()
  const { verifyCount } = useCount()
  const { createAlert } = useAlert()
  const addItemHistory = async (id: string, product: ProductModel) => {
    if (historyListPending) {
      const verify = verifyCount(
        historyListPending,
        product.category.name,
        product.id,
        1
      )
      if (!verify) return
      const message = await addProductListHistory(historyId, id)
      if (message) {
        createAlert(`Producto ${product.name} agregado a lista `, false)
        const { newProduct } =
          parseProductModelToProductShoppingListWithCategoryClientOne(product)
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
