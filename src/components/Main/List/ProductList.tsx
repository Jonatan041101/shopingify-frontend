'use client'
import useView from '@/hooks/useView'
import { ListBuy, ProductList } from '@/types/types'
import React from 'react'
import Pzas from './Pzas'
import Button from '@/atoms/button/Button'
import { useBearStore } from '@/store/store'
import { counterItem } from '@/store/operations/addItem'
import { deleteItemList } from '@/store/operations/deleteItem'
import { createBuyProduct } from '@/utils/convert'
import Icons from '@/atoms/icons'
import {
  deleteProductListHistory,
  updateCountProductListHistory,
} from '@/utils/apiHistory'
import SelectYesNo from '@/components/Modal/SelectYesNo'
import useAlert from '@/hooks/useAlert'
interface Props {
  product: ProductList
  listItems: ListBuy[]
}

export default function ProductList({ product, listItems }: Props) {
  const { view, changeView } = useView()
  const { view: checked, changeView: changeChecked } = useView()
  const { createAlert } = useAlert()
  const {
    viewDrive,
    historyListPending,
    addItemList,
    addProductHistory,
    viewProductDetail,
    changeStatus,
  } = useBearStore((state) => state)

  const categoryName = product.category.name
  const handleMore = async () => {
    if (historyListPending) {
      const response = await updateCountProductListHistory(product.id, 1)

      const newList = counterItem(listItems, 1, product.id, categoryName)
      addProductHistory(newList)
      return
    }
    const newList = counterItem(listItems, 1, product.id, categoryName)
    addItemList(newList)
  }
  const handleLess = async () => {
    if (historyListPending) {
      if (product.count <= 1) return
      const response = await updateCountProductListHistory(product.id, -1)
      const newList = counterItem(listItems, -1, product.id, categoryName)
      addProductHistory(newList)
      return
    }
    const newList = counterItem(listItems, -1, product.id, categoryName)
    addItemList(newList)
  }
  const deleteItem = async () => {
    try {
      if (historyListPending) {
        const response = await deleteProductListHistory(product.id)
        const newList = deleteItemList(listItems, categoryName, product.id)
        if (response) {
          createAlert(response.message, false)
        }
        addProductHistory(newList)
        return
      }
      const newList = deleteItemList(listItems, categoryName, product.id)
      addItemList(newList)
    } catch (error) {
      const ERROR = error as Error
      createAlert(ERROR.message, true)
    }
  }
  const handleViewProductDetail = () => {
    const { newProduct } = createBuyProduct(product)
    viewProductDetail(newProduct)
  }
  const handleChangeListProductBuy = () => {
    changeChecked()
  }
  const handleConfirmDelete = (confirm: boolean) => {
    if (confirm) {
      deleteItem()
      changeStatus(false, '', false, () => {})
    } else {
      changeStatus(false, '', false, () => {})
    }
  }
  const handleCofirm = (stat: boolean) => {
    // setStatus(() => status)
    // Paso la funcion handleDecision para ejecutarla en la modal y asi poder reutilizar esa modal con distintas funciones
    changeStatus(
      stat,
      `Estas seguro que deseas eliminar de la lista el producto ${product.name}`,
      true,
      handleConfirmDelete
    )
  }
  return (
    <>
      <article className="itemslist__article">
        <div className="itemslist__product">
          {viewDrive && (
            <button
              className="itemslist__checked"
              onClick={handleChangeListProductBuy}
            >
              {checked && (
                <i className="itemslist__checked--i">
                  <Icons icon="nice" />
                </i>
              )}
            </button>
          )}
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
            <Button icon="less" click={handleLess} />
            <Pzas count={product.count} />
            <Button icon="more" click={handleMore} />
          </div>
        ) : (
          <button onClick={changeView}>
            <Pzas count={product.count} />
          </button>
        )}
      </article>
    </>
  )
}
