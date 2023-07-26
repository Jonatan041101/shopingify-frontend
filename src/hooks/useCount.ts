import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import {
  searchCategory,
  searchingProductWithID,
} from '@/utils/searching/searchingProductOrCategory'
import useAlert from './useAlert'

export default function useCount() {
  const { createAlert } = useAlert()
  const verifyCount = (
    listItems: ProductShoppingListWithCategoryClient[],
    categoryName: string,
    productId: string,
    count: number
  ) => {
    const { category } = searchCategory(listItems, categoryName)
    if (category) {
      const { product } = searchingProductWithID(category, productId)
      if (product && product.count + count > product.product.stock.count) {
        return createAlert(`No hay mas stock disponible`, true)
      }
      if (product && product.count + count <= 0) {
        return createAlert(`No puedes poner producto en 0 o negativos`, true)
      }
    }
    return true
  }
  return {
    verifyCount,
  }
}
