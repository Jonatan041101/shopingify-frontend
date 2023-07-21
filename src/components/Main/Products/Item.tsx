'use client'
import Icons from '@/atoms/icons'
import useAddItem from '@/hooks/useAddItem'
import useAlert from '@/hooks/useAlert'
import { addOrUpdateFromAllListToShoppingList } from '@/store/operations/addItem'
import { useBearStore } from '@/store/store'
import { ProductModel } from '@/types/model'
import { createProductShoppinList } from '@/utils/convert'
import React from 'react'

interface Props {
  product: ProductModel
  count?: number
}

export default function Item({ product, count }: Props) {
  const { list, historyListPending, addItemList, viewProductDetail } =
    useBearStore((state) => state)
  const { createAlert } = useAlert()
  const { addItemHistory } = useAddItem()
  const handleAddItemList = async () => {
    try {
      if (historyListPending) {
        addItemHistory(product.id, product)
        return
      } else {
        const { newProduct } = createProductShoppinList(product)
        const newList = addOrUpdateFromAllListToShoppingList(newProduct, list)
        addItemList(newList)
      }
    } catch (error) {
      const ERROR = error as Error
      createAlert(ERROR.message, true)
    }
  }
  const handleViewProductDetail = () => {
    const { newProduct } = createProductShoppinList(product)
    viewProductDetail(newProduct)
  }

  return (
    <article className="item">
      <h3 className="item__name" onClick={handleViewProductDetail}>
        {product.name}
      </h3>
      {count ? (
        <div className="itemslist__count item__count">
          <div>{count}</div>
        </div>
      ) : (
        <button className="item__more" onClick={handleAddItemList}>
          <i className="item__icon">
            <Icons icon="more" />
          </i>
        </button>
      )}
    </article>
  )
}
