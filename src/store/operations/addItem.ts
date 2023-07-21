import {
  ProductShoppingListWithCategoryClient,
  ProductShoppingListWithCategoryClientOne,
} from '@/types/parse'
import { parseListBuyTheBuyProduct } from '@/utils/parse/parseForListBuy'
import {
  newProductToAdd,
  searchingProductWithID,
} from '@/utils/searching/searchingProductOrCategory'

export const addOrUpdateFromAllListToShoppingList = (
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
  product.count = product.count + 1
  return newItems
}

export const counterItem = (
  items: ProductShoppingListWithCategoryClient[],
  count: number,
  PRODUCT_ID: string,
  categoryName: string,
  backend?: boolean
) => {
  console.log({
    items,
    count,
    PRODUCT_ID,
    categoryName,
  })

  const { newItems, category } =
    newProductToAdd<ProductShoppingListWithCategoryClient>(items, categoryName)
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
