import { CategoryHistory, CategoryName, HistoryItem } from '@/types/types'
export const limpCategorys = (allCategorys: CategoryName[]) => {
  const uniqueCategory: CategoryName[] = []
  allCategorys.forEach((repeatCategory) => {
    let exist = false
    uniqueCategory.forEach((category) => {
      if (repeatCategory.name === category.name) {
        exist = true
      }
    })
    if (!exist) {
      uniqueCategory.push(repeatCategory)
    }
  })
  return uniqueCategory
}
export const addCategoryProduct = (history: HistoryItem) => {
  const allCategorys: CategoryName[] = history.product.map(({ product }) => ({
    name: product.category.name,
    id: product.category.id,
  }))
  const uniqueCategory = limpCategorys(allCategorys)
  const newCategoryWithProduct: CategoryHistory[] = []
  uniqueCategory.forEach(({ id, name }) => {
    const category: CategoryHistory = {
      id,
      name,
      product: [],
    }
    history.product.forEach((product, index) => {
      if (name === product.product.category.name) {
        category.product.push(product)
      }
      if (history.product.length - 1 === index) {
        newCategoryWithProduct.push(category)
      }
    })
  })

  return newCategoryWithProduct
}
