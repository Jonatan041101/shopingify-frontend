import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import { BuyProduct, ListBuy } from '@/types/types'
export const deleteItemList = (
  list: ProductShoppingListWithCategoryClient[],
  categoryName: string,
  productId: string
) => {
  const newList = [...list]
  let category = newList.find(({ category }) => category === categoryName)
  // if (!category)
  //   throw new Error(`Categoria no encontrada del nombre ${categoryName}`)
  const copyCategory = { ...category }
  const restProducts = copyCategory?.product?.filter(
    ({ id }) => id !== productId
  )
  if (category && restProducts) {
    category.product = restProducts
  }

  if (restProducts?.length === 0) {
    const NEW_LIST_DELETE_CATEGORY = newList.filter(
      ({ category }) => category !== copyCategory.category
    )

    return NEW_LIST_DELETE_CATEGORY
  }

  return newList
}
