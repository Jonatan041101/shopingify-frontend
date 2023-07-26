'use client'
import useView from '@/hooks/useView'
import React from 'react'
import Pzas from '../Pzas'
import { useBearStore } from '@/store/store'
import { parseProductModelToProductShoppingListWithCategoryClientOne } from '@/utils/parse/parseShoppingList'
import useProduct from '@/hooks/useProduct'
import OptionsProduct from './OptionsProduct'
import { ProductShoppingListModel } from '@/types/model'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'
interface Props {
  product: ProductShoppingListModel
  listItems: ProductShoppingListWithCategoryClient[]
}

export default function ProductList({ product, listItems }: Props) {
  const { view, changeView } = useView()
  const { deleteItem, handleUpdateProduct } = useProduct()
  const { viewProductDetail, changeStatus, handleLoadingChange } = useBearStore(
    (state) => state
  )

  const categoryName = product.product.category.name
  const handleViewProductDetail = () => {
    const { newProduct } =
      parseProductModelToProductShoppingListWithCategoryClientOne(
        product.product
      )
    viewProductDetail(newProduct)
  }

  const handleConfirmDelete = (confirm: boolean) => {
    if (confirm) {
      deleteItem(product.id, categoryName, listItems)
      changeStatus(false, '', false, () => {})
    } else {
      changeStatus(false, '', false, () => {})
    }
    handleLoadingChange(false)
  }
  const handleCofirm = (stat: boolean) => {
    // Paso la funcion handleDecision para ejecutarla en la modal y asi poder reutilizar esa modal con distintas funciones
    changeStatus(
      stat,
      `Estas seguro que deseas eliminar de la lista el producto ${product.product.name}`,
      true,
      handleConfirmDelete
    )
  }
  return (
    <article className="itemslist__article">
      <div className="itemslist__product">
        <h3 className={`itemslist__h3`} onClick={handleViewProductDetail}>
          {product.product.name}
        </h3>
      </div>
      {view ? (
        <OptionsProduct
          categoryName={categoryName}
          count={product.count}
          productId={product?.id ?? product.product.id}
          listItems={listItems}
          handleCofirm={handleCofirm}
          handleUpdateProduct={handleUpdateProduct}
        />
      ) : (
        <button onClick={changeView}>
          <Pzas count={product.count} />
        </button>
      )}
    </article>
  )
}
