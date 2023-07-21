import { BuyProduct, ListBuy } from '@/types/types'

export const parseListBuyTheBuyProduct = (item: BuyProduct) => {
  const newCategoryWithProduct: ListBuy = {
    id: item.id,
    category: item.category,
    product: [item.product],
  }
  return { newCategoryWithProduct }
}
