import { Category } from '@/types/types'

export const searchCategory = (newItems: Category[], categoryName: string) => {
  const category = newItems.find(({ name }) => name === categoryName)
  return {
    category,
  }
}

export const newProductToAdd = (items: Category[], categoryName: string) => {
  const newItems: Category[] = [...items]
  const { category } = searchCategory(newItems, categoryName)
  // const category = newItems.find(({ name }) => name === categoryName)
  return {
    newItems,
    category,
  }
}
