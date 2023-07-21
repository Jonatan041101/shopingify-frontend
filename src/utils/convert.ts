import { limpCategorys } from './addCategoryProduct'
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

export const createProductShoppinList = (product: ProductModel) => {
  const newProduct: ProductShoppingListWithCategoryClientOne = {
    category: product.category.name,
    id: product.category.id,
    product: {
      count: 1,
      id: '',
      product,
    },
  }
  return { newProduct }
}
export const historyPendingToListBuy = (
  historyPending: HistoryShoppingModel
) => {
  const categorys: CategoryWithNameOnly[] = historyPending.product.map(
    (category) => ({
      id: category.product.category.id,
      category: category.product.category.name,
    })
  )
  const uniqueCategory = limpCategorys(categorys)
  const listBuy: ProductShoppingListWithCategoryClient[] = []
  uniqueCategory.forEach(({ id, category }) => {
    const categoryList: ProductShoppingListWithCategoryClient = {
      id,
      category: category,
      product: [],
    }
    historyPending.product.forEach((product, index) => {
      if (category === product.product.category.name) {
        const newProductList: ProductShoppingListModel = {
          // category: {
          //   id: product.product.category.id,
          //   name: product.product.category.name,
          //   product:[product.product]
          // },
          // categoryId: product.product.categoryId,
          count: product.count,
          id: product.product.id,
          // productId: product.id,
          // ID DEL PRODUCTLIST SCHEMA DE BASE DE DATOS EN VES DEL PRODUCTO  PARA UTILIZAR EN EL UPDATE,
          // image: product.product.image,
          // name: product.product.name,
          // note: product.product.note,
          // price: product.product.price,
          // stock: product.product.stock,
          product: product.product,
        }
        categoryList.product.push(newProductList)
      }
      if (historyPending.product.length - 1 === index) {
        listBuy.push(categoryList)
      }
    })
  })
  return listBuy
}
