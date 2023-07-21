import {
  ProductShoppingListWithCategoryClient,
  ProductShoppingListWithCategoryClientOne,
} from '@/types/parse'

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
