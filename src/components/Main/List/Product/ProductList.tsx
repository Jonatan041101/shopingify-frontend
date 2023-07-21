'use client'
import useView from '@/hooks/useView'
import { ListBuy, ProductList } from '@/types/types'
import React from 'react'
import Pzas from '../Pzas'
import { useBearStore } from '@/store/store'
import { createBuyProduct } from '@/utils/convert'
import useProduct from '@/hooks/useProduct'
import MarkerCheck from './MarkerCheck'
import OptionsProduct from './OptionsProduct'
interface Props {
  product: ProductList
  listItems: ListBuy[]
}

export default function ProductList({ product, listItems }: Props) {
  const { view, changeView } = useView()
  const { view: checked, changeView: changeChecked } = useView()
  const { deleteItem, handleUpdateProduct } = useProduct()
  const { viewDrive, viewProductDetail, changeStatus } = useBearStore(
    (state) => state
  )

  const categoryName = product.category.category
  const handleViewProductDetail = () => {
    const { newProduct } = createBuyProduct(product)
    viewProductDetail(newProduct)
  }
  const handleChangeListProductBuy = () => {
    changeChecked()
  }
  const handleConfirmDelete = (confirm: boolean) => {
    if (confirm) {
      deleteItem(product.id, categoryName, listItems)
      changeStatus(false, '', false, () => {})
    } else {
      changeStatus(false, '', false, () => {})
    }
  }
  const handleCofirm = (stat: boolean) => {
    // Paso la funcion handleDecision para ejecutarla en la modal y asi poder reutilizar esa modal con distintas funciones
    changeStatus(
      stat,
      `Estas seguro que deseas eliminar de la lista el producto ${product.name}`,
      true,
      handleConfirmDelete
    )
  }
  return (
    <article className="itemslist__article">
      <div className="itemslist__product">
        <MarkerCheck
          checked={checked}
          viewDrive={viewDrive}
          handleChangeListProductBuy={handleChangeListProductBuy}
        />
        <h3
          className={`itemslist__h3 ${checked ? 'itemslist__tached' : ''}`}
          onClick={handleViewProductDetail}
        >
          {product.name}
        </h3>
      </div>
      {view ? (
        <OptionsProduct
          categoryName={categoryName}
          count={product.count}
          productId={product?.productId ?? product.id}
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
