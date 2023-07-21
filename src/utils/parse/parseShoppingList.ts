import { deleteNameCopyCategory } from '../addCategoryProduct'
import {
  CategoryWithNameOnly,
  ProductShoppingListWithCategoryClient,
  ProductShoppingListWithCategoryClientOne,
} from '@/types/parse'
import {
  HistoryShoppingModel,
  ProductModel,
  ProductShoppingListModel,
} from '@/types/model'
import {
  craeteProductShoppingModel,
  parseHistoryShoppingModelToProductoShooping,
} from './historyShoppinModel'
import { parseCategoryWithName } from './parseCategoryWithName'

export const parseProductModelToProductShoppingListWithCategoryClientOne = (
  product: ProductModel
) => {
  const newProduct: ProductShoppingListWithCategoryClientOne = {
    category: product.category.name,
    id: product.category.id,
    product: {
      count: 1,
      id: product.id,
      product,
    },
  }
  return { newProduct }
}
export const historyPendingToProductShoppingListWithCategoryClient = (
  historyPending: HistoryShoppingModel
) => {
  const categorys: CategoryWithNameOnly[] =
    parseCategoryWithName(historyPending)
  console.log({ categorys })

  const uniqueCategory = deleteNameCopyCategory(categorys)
  const productShoppingListWithCategory: ProductShoppingListWithCategoryClient[] =
    []
  uniqueCategory.forEach(({ id, category }) => {
    const { categoryList } = parseHistoryShoppingModelToProductoShooping(
      id,
      category
    )
    historyPending.product.forEach(({ product, count, id }, index) => {
      if (category === product.category.name) {
        const newProductList = craeteProductShoppingModel(count, id, product)
        categoryList.product.push(newProductList)
      }
      if (historyPending.product.length - 1 === index) {
        productShoppingListWithCategory.push(categoryList)
      }
    })
  })
  return productShoppingListWithCategory
}
