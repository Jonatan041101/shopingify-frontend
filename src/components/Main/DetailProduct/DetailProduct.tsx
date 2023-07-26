'use client'
import Button from '@/atoms/button/Button'
import Image from 'next/image'
import React from 'react'
import Section from './Section'
import { useBearStore } from '@/store/store'
import { addOrUpdateFromAllListToShoppingList } from '@/store/operations/addItem'
import { deleteItemList } from '@/store/operations/deleteItem'
import useAddItem from '@/hooks/useAddItem'
import { deleteProductModel } from '@/utils/products'
import useAlert from '@/hooks/useAlert'
import { deleteProductModelHome } from '@/utils/deleteProductModel'
import { ProductShoppingListWithCategoryClientOne } from '@/types/parse'
import Spinner from '@/atoms/Spinner'
import Icons from '@/atoms/icons'
interface Props {
  product: ProductShoppingListWithCategoryClientOne
}
export default function DetailProduct({ product }: Props) {
  const {
    viewProductDetail,
    addItemList,
    changeStatus,
    addProductHistory,
    optionsUpdateProduct,
    changeViewCreate,
    handleLoadingChange,
    deleteProducts,
    dolar,
    loading,
    products,
    shoppinList,
    historyListPending,
  } = useBearStore((state) => state)
  const { addItemHistory } = useAddItem()
  const { createAlert } = useAlert()

  const handleViewProductDetail = () => {
    viewProductDetail(null)
  }
  const handleAddItemList = async () => {
    if (historyListPending) {
      addItemHistory(product.product.id, product.product.product)
      return
    }
    const newList = addOrUpdateFromAllListToShoppingList(product, shoppinList)
    addItemList(newList)
  }
  const deleteItem = async (confirm: boolean) => {
    try {
      changeStatus(false, '', false, () => {})
      if (confirm) {
        const res = await deleteProductModel(product.product.id)
        console.log({ res })

        if (res) {
          createAlert(res.message, true)
          handleLoadingChange(false)
        }
        handleViewProductDetail()
        if (historyListPending) {
          const newList = deleteItemList(
            historyListPending,
            product.category,
            product.product.id
          )

          addProductHistory(newList)
          const ITEMS = deleteProductModelHome(products, product.product.id)
          deleteProducts(ITEMS)
          return
        }
        const newList = deleteItemList(
          shoppinList,
          product.category,
          product.product.id
        )

        addItemList(newList)
        changeStatus(false, '', false, () => {})
        const ITEMS = deleteProductModelHome(products, product.product.id)
        deleteProducts(ITEMS)
        return
      }
      changeStatus(false, '', false, () => {})
    } catch (error) {
      console.log({ error })
    }
  }
  const handleConfirm = () => {
    changeStatus(
      false,
      `Esta seguro que desea eliminar de la lista de articulos el producto ${product.product.product.name}`,
      true,
      deleteItem
    )
  }
  const handleUpdateProduct = (
    product: ProductShoppingListWithCategoryClientOne
  ) => {
    optionsUpdateProduct(product)
    handleViewProductDetail()
    changeViewCreate(true, 'Actualizar producto')
  }
  return (
    <div className="detailproduct">
      <div className="detailproduct__top">
        <div className="detailproduct__back">
          <Button
            icon="arrow-back"
            text="Volver"
            click={handleViewProductDetail}
          />
          {!loading && (
            <button
              onClick={() => handleUpdateProduct(product)}
              id="detailproduct__edition"
            >
              <i className="detailproduct__edit">
                <Icons icon="lapiz" />
              </i>
            </button>
          )}
        </div>
        <Image
          className="detailproduct__image"
          src={product.product.product.image}
          alt={`Imagen del producto ${product.product.product.name}`}
          width={150}
          height={100}
        />
      </div>
      <section className="detailproduct__description">
        <div className="detailproduct__des">
          <Section
            name="Nombre"
            text={product.product.product.name}
            titleName
          />
          <Section name="Categoria" text={product.category} />
          {isNaN(Number(dolar?.value)) ? (
            <Spinner height="1em" width="1em" />
          ) : (
            <Section
              name="Precio"
              text={String(
                Math.trunc(
                  Number(product.product.product.price) * Number(dolar?.value)
                )
              )}
            />
          )}
          <Section
            name="Cantidad"
            text={String(product.product.product.stock.count)}
          />
          <Section name="Nota" text={product.product.product.note} />
        </div>
        <div className="detailproduct__buttons">
          {loading ? (
            <Spinner height="3.5em" width="3.5em" />
          ) : (
            <>
              <Button
                text="Eliminar"
                click={handleConfirm}
                classN="button__white"
              />
              <Button
                text="Agregar"
                click={handleAddItemList}
                classN="button__yellow"
              />
            </>
          )}
        </div>
      </section>
    </div>
  )
}
