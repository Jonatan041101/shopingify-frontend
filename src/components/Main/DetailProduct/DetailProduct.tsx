'use client'
import Button from '@/atoms/button/Button'
import Image from 'next/image'
import React from 'react'
import Section from './Section'
import { useBearStore } from '@/store/store'
import { addOrUpdateFromAllListToShoppingList } from '@/store/operations/addItem'
import { deleteItemList } from '@/store/operations/deleteItem'
import useAddItem from '@/hooks/useAddItem'
import { deleteItemToListArticles } from '@/utils/products'
import useAlert from '@/hooks/useAlert'
import { deleteProductModelHome } from '@/utils/deleteProductModel'
import { ProductShoppingListWithCategoryClientOne } from '@/types/parse'
interface Props {
  product: ProductShoppingListWithCategoryClientOne
}
export default function DetailProduct({ product }: Props) {
  const {
    viewProductDetail,
    addItemList,
    changeStatus,
    addProductHistory,
    deleteProducts: deleteItems,
    products: items,
    shoppinList: list,
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
    const newList = addOrUpdateFromAllListToShoppingList(product, list)
    addItemList(newList)
  }
  const deleteItem = async (confirm: boolean) => {
    try {
      if (confirm) {
        const res = await deleteItemToListArticles(product.product.id)

        if (res) {
          createAlert(res.message, true)
        }
        handleViewProductDetail()
        if (historyListPending) {
          const newList = deleteItemList(
            historyListPending,
            product.category,
            product.product.id
          )

          addProductHistory(newList)
          changeStatus(false, '', false, () => {})
          const ITEMS = deleteProductModelHome(items, product.product.id)
          deleteItems(ITEMS)
          return
        }
        const newList = deleteItemList(
          list,
          product.category,
          product.product.id
        )

        addItemList(newList)
        changeStatus(false, '', false, () => {})
        const ITEMS = deleteProductModelHome(items, product.product.id)
        deleteItems(ITEMS)
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

  return (
    <div className="detailproduct">
      <div className="detailproduct__top">
        <div className="detailproduct__back">
          <Button
            icon="arrow-back"
            text="Back"
            click={handleViewProductDetail}
          />
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
          <Section
            name="Precio"
            text={String(Number(product.product.product.price) * 525)}
          />
          <Section
            name="Cantidad"
            text={String(product.product.product.stock.count)}
          />
          <Section name="Nota" text={product.product.product.note} />
        </div>
        <div className="detailproduct__buttons">
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
        </div>
      </section>
    </div>
  )
}
