import { BuyProduct, ListBuy } from '@/types/types'

export const addItemOrUpdate = (item: BuyProduct, items: ListBuy[]) => {
  const copyItems = [...items]
  const category = copyItems.find(({ category }) => item.category === category)
  //Buscamos si existe el producto con la categoria

  if (!category) {
    //SI NO EXISTE AGREGAMOS EL PRODUCTO CON SU CATEGORIA
    const newCategory: ListBuy = {
      id: item.id,
      category: item.category,
      product: [item.product],
    }

    copyItems.push(newCategory)
    return copyItems // DEVOLVEMOS UN ARRAY MUTADO PERO NO DA PROBLEMAS PORQUE MUTAMOS UN ARRAY EXTERNO RECUERDA SIEMPRE QUE NO ES BUENO MUTAR PERO EN ESTE CASO ES UNA EXCEPCION
  }
  const productExist = category.product.find(({ id }) => id === item.product.id)
  // Buscamos si el producto no existe ya en la categoria si no existe lo agregamos directamente
  if (!productExist) {
    //SI EXISTE SOLO AÑADIMOS EL PRODUCTO A LA CATEGORIA EXISTENTE
    category?.product.push(item.product)
    return copyItems // DEVOLVEMOS UN ARRAY MUTADO PERO NO DA PROBLEMAS PORQUE MUTAMOS UN ARRAY EXTERNO RECUERDA SIEMPRE QUE NO ES BUENO MUTAR PERO EN ESTE CASO ES UNA EXCEPCION
  }
  //Si el producto existe aumentamos su count porque lo que hace es la funciona de agregar
  productExist.count = productExist.count + 1
  return copyItems
}

export const counterItem = (
  items: ListBuy[],
  count: number,
  productId: string,
  categoryName: string
) => {
  const newItems = [...items]
  const category = newItems.find(({ category }) => category === categoryName)
  if (!category)
    throw new Error(`Categoria no encontrada del nombre ${categoryName}`)
  const product = category.product.find(({ id }) => id === productId)
  if (!product)
    throw new Error(
      `Producto no encontrado para actualizar con el id ${productId}`
    )
  product.count = product.count + count
  return newItems
}
