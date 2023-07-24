import {
  ProductShoppingListWithCategoryClient,
  ProductShoppingListWithCategoryClientOne,
} from '@/types/parse'
import { parseListBuyTheBuyProduct } from '@/utils/parse/parseToProductShoppinList'
import {
  newProductToAdd,
  searchingProductWithID,
} from '@/utils/searching/searchingProductOrCategory'
import useAlert from './useAlert'

export default function useCountProduct() {
  const { createAlert } = useAlert()
  const addOrUpdateFromAllListToShoppingList = (
    productShoppingList: ProductShoppingListWithCategoryClientOne,
    productShoppingListAll: ProductShoppingListWithCategoryClient[]
  ) => {
    const { newItems, category } =
      newProductToAdd<ProductShoppingListWithCategoryClient>(
        productShoppingListAll,
        productShoppingList.category
      )

    //Buscamos si existe el producto con la categoria

    if (!category) {
      //SI NO EXISTE AGREGAMOS EL PRODUCTO CON SU CATEGORIA
      const { newCategoryWithProduct } =
        parseListBuyTheBuyProduct(productShoppingList)
      newItems.push(newCategoryWithProduct)
      return newItems // DEVOLVEMOS UN ARRAY MUTADO PERO NO DA PROBLEMAS PORQUE MUTAMOS UN ARRAY EXTERNO RECUERDA SIEMPRE QUE NO ES BUENO MUTAR PERO EN ESTE CASO ES UNA EXCEPCION
    }
    // const productExist = category.product.find(({ id }) => id === item.product.id)
    const { product } = searchingProductWithID(
      category,
      productShoppingList.product.id
    )
    // Buscamos si el producto no existe ya en la categoria si no existe lo agregamos directamente
    if (!product) {
      //SI EXISTE SOLO AÑADIMOS EL PRODUCTO A LA CATEGORIA EXISTENTE
      category.product.push(productShoppingList.product)
      return newItems // DEVOLVEMOS UN ARRAY MUTADO PERO NO DA PROBLEMAS PORQUE MUTAMOS UN ARRAY EXTERNO RECUERDA SIEMPRE QUE NO ES BUENO MUTAR PERO EN ESTE CASO ES UNA EXCEPCION
    }
    //Si el producto existe aumentamos su count porque lo que hace es la funciona de agregar

    if (product.count + 1 > product.product.stock.count) {
      createAlert(`No se pueden agregar mas ${product.product.name} `, true)
      return newItems
    } else {
      product.count = product.count + 1
      return newItems
    }
  }

  const counterItem = (
    items: ProductShoppingListWithCategoryClient[],
    count: number,
    PRODUCT_ID: string,
    categoryName: string,
    backend?: boolean
  ) => {
    const { newItems, category } =
      newProductToAdd<ProductShoppingListWithCategoryClient>(
        items,
        categoryName
      )
    if (!category)
      throw new Error(`Categoria no encontrada del nombre ${categoryName}`)
    const { product } = searchingProductWithID(category, PRODUCT_ID)
    if (!product)
      throw new Error(
        `Producto no encontrado para actualizar con el id ${PRODUCT_ID}`
      )
    if (!backend) {
      product.count = product.count + count
    } else {
      product.count = count
    }
    return newItems
  }

  const deleteItemList = (
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
  return {
    addOrUpdateFromAllListToShoppingList,
    counterItem,
    deleteItemList,
  }
}
