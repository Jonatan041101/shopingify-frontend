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
    category: product.category.category,
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
      category: category.product.category.category,
    })
  )
  const uniqueCategory = limpCategorys(categorys)
  const listBuy: ListBuy[] = []
  uniqueCategory.forEach(({ id, category }) => {
    const categoryList: ListBuy = {
      id,
      category: category,
      product: [],
    }
    historyPending.history.product.forEach((product, index) => {
      if (category === product.product.category.category) {
        const newProductList: ProductList = {
          category: product.product.category,
          categoryId: product.product.categoryId,
          count: product.count,
          id: product.product.id,
          productId: product.id,
          // ID DEL PRODUCTLIST SCHEMA DE BASE DE DATOS EN VES DEL PRODUCTO  PARA UTILIZAR EN EL UPDATE,
          image: product.product.image,
          name: product.product.name,
          note: product.product.note,
          price: product.product.price,
          stock: product.product.stock,
        }
        categoryList.product.push(newProductList)
      }
      if (historyPending.history.product.length - 1 === index) {
        listBuy.push(categoryList)
      }
    })
  })
  return listBuy
}
