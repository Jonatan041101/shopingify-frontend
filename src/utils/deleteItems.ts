import { Category } from '@/types/types'

export const deleteItemsHome = (items: Category[], id: string) => {
  const newItems: Category[] = []
  items.forEach((item) => {
    let itemDelete = false
    const newItem: Category = {
      id: item.id,
      name: item.name,
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
  console.log({ NEW_ITEMS }, 'DELETEITEM')

  return NEW_ITEMS
}
