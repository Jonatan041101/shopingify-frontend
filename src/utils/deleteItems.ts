import { CategoryWithProductClient } from '@/types/parse'

export const deleteItemsHome = (
  items: CategoryWithProductClient[],
  id: string
) => {
  const newItems: CategoryWithProductClient[] = []
  items.forEach((item) => {
    let itemDelete = false
    const newItem: CategoryWithProductClient = {
      id: item.id,
      category: item.category,
      product: [],
    }
    item.product.forEach((prod, index) => {
      if (prod.id === id) {
        itemDelete = true
      }
      if (!itemDelete) {
        newItem.product.push(prod)
      }
      itemDelete = false
      if (item.product.length - 1 === index) {
        newItems.push(newItem)
      }
    })
  })
  const NEW_ITEMS = newItems.filter((product) => product.product.length > 0)

  return NEW_ITEMS
}
