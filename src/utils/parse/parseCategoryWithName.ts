import { HistoryShoppingModel } from '@/types/model'
import { CategoryWithNameOnly } from '@/types/parse'
type ParseCategoryWithName = HistoryShoppingModel
export const parseCategoryWithName = <T extends ParseCategoryWithName>(
  historyPending: T
) => {
  const parseCategory: CategoryWithNameOnly[] = historyPending.product.map(
    (category) => ({
      id: category.product.category.id,
      category: category.product.category.name,
    })
  )
  return parseCategory
}
