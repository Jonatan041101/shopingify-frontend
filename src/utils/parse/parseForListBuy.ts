import {
  ProductShoppingListWithCategoryClient,
  ProductShoppingListWithCategoryClientOne,
} from '@/types/parse'
import { BuyProduct, ListBuy } from '@/types/types'

export const parseListBuyTheBuyProduct = (
  item: ProductShoppingListWithCategoryClientOne
) => {
  const newCategoryWithProduct: ProductShoppingListWithCategoryClient = {
    id: item.id,
    category: item.category,
    product: [item.product],
  }
  return { newCategoryWithProduct }
}
