import {
  BuyProduct,
  CategoryName,
  HistoryPending,
  ListBuy,
  Product,
  ProductList,
} from '@/types/types'
import { limpCategorys } from './addCategoryProduct'

export const createBuyProduct = (product: Product) => {
  const newProduct: BuyProduct = {
    category: product.category.name,
    id: product.category.id,
    product: {
      ...product,
      count: 1,
    },
  }
  return { newProduct }
}
export const historyPendingToListBuy = (historyPending: HistoryPending) => {
  const categorys: CategoryName[] = historyPending.history.product.map(
    (category) => ({
      id: category.product.category.id,
      name: category.product.category.name,
    })
  )
  const uniqueCategory = limpCategorys(categorys)
  const listBuy: ListBuy[] = []
  uniqueCategory.forEach(({ id, name }) => {
    const category: ListBuy = {
      id,
      category: name,
      product: [],
    }
    historyPending.history.product.forEach((product, index) => {
      if (name === product.product.category.name) {
        const newProductList: ProductList = {
          category: product.product.category,
          categoryId: product.product.categoryId,
          count: product.count,
          id: product.id, // ID DEL PRODUCTLIST SCHEMA DE BASE DE DATOS EN VES DEL PRODUCTO  PARA UTILIZAR EN EL UPDATE,
          image: product.product.image,
          name: product.product.name,
          note: product.product.note,
          price: product.product.price,
          stock: product.product.stock,
        }
        category.product.push(newProductList)
      }
      if (historyPending.history.product.length - 1 === index) {
        listBuy.push(category)
      }
    })
  })
  return listBuy
}
