'use client'
import useView from '@/hooks/useView'
import { ListBuy, ProductList } from '@/types/types'
import React from 'react'
import Pzas from '../Pzas'
import Button from '@/atoms/button/Button'
import { useBearStore } from '@/store/store'
import { createBuyProduct } from '@/utils/convert'
import OptionsProduct from './OptionsProduct'
import useProduct from '@/hooks/useProduct'
interface Props {
  product: ProductList
  listItems: ListBuy[]
}

export default function ProductList({ product, listItems }: Props) {
  const { view, changeView } = useView()
  const { view: checked, changeView: changeChecked } = useView()
  const { deleteItem, handleUpdateProdcut } = useProduct()
  const { viewDrive, viewProductDetail, changeStatus } = useBearStore(
    (state) => state
  )

  const categoryName = product.category.name
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
        <OptionsProduct
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
        <div className="itemslist__white">
          <Button deleteP icon="delete" click={() => handleCofirm(false)} />
          <Button
            icon="less"
            click={() =>
              handleUpdateProdcut(-1, product.id, categoryName, listItems)
            }
          />
          <Pzas count={product.count} />
          <Button
            icon="more"
            click={() =>
              handleUpdateProdcut(1, product.id, categoryName, listItems)
            }
          />
        </div>
      ) : (
        <button onClick={changeView}>
          <Pzas count={product.count} />
        </button>
      )}
    </article>
  )
}
