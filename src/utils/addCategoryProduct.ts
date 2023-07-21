import { HistoryShoppingModel } from '@/types/model'
import { CategoryInHistoryClient, CategoryWithNameOnly } from '@/types/parse'
export const limpCategorys = (allCategorys: CategoryWithNameOnly[]) => {
  const uniqueCategory: CategoryWithNameOnly[] = []
  allCategorys.forEach((repeatCategory) => {
    let exist = false
    uniqueCategory.forEach((category) => {
      if (repeatCategory.category === category.category) {
        exist = true
      }
    })
    if (!exist) {
      uniqueCategory.push(repeatCategory)
    }
  })
  return uniqueCategory
}
export const addCategoryProduct = (history: HistoryShoppingModel) => {
  const allCategorys: CategoryWithNameOnly[] = history.product.map(
    ({ product }) => ({
      category: product.category.name,
      id: product.category.id,
    })
  )
  const uniqueCategory = limpCategorys(allCategorys)
  const newCategoryWithProduct: CategoryInHistoryClient[] = []
  uniqueCategory.forEach(({ id, category }) => {
    const newCategory: CategoryInHistoryClient = {
      id,
      category,
      product: [],
    }
    history.product.forEach((product, index) => {
      if (category === product.product.category.name) {
        newCategory.product.push(product)
      }
      if (history.product.length - 1 === index) {
        newCategoryWithProduct.push(newCategory)
      }
    })
  })

  return newCategoryWithProduct
}
