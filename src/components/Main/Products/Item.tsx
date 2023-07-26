'use client'
import Icons from '@/atoms/icons'
import useAddItem from '@/hooks/useAddItem'
import useAlert from '@/hooks/useAlert'
import useCountProduct from '@/hooks/useCountProduct'

import { useBearStore } from '@/store/store'
import { ProductModel } from '@/types/model'
import { parseProductModelToProductShoppingListWithCategoryClientOne } from '@/utils/parse/parseShoppingList'
import React from 'react'

interface Props {
  product: ProductModel
  count?: number
}

export default function Item({ product, count }: Props) {
  const {
    shoppinList: list,
    historyListPending,
    addItemList,
    viewProductDetail,
  } = useBearStore((state) => state)
  const { createAlert } = useAlert()
  const { addItemHistory } = useAddItem()
  const { addOrUpdateFromAllListToShoppingList } = useCountProduct()
  const handleAddItemList = async () => {
    try {
      if (product.stock.count === 0)
        return createAlert(`El producto ${product.name} no tiene stock`, true)
      if (historyListPending) {
        addItemHistory(product.id, product)
        return
      } else {
        const { newProduct } =
          parseProductModelToProductShoppingListWithCategoryClientOne(product)
        const newList = addOrUpdateFromAllListToShoppingList(newProduct, list)
        addItemList(newList)
      }
    } catch (error) {
      const ERROR = error as Error
      createAlert(ERROR.message, true)
    }
  }
  const handleViewProductDetail = () => {
    const { newProduct } =
      parseProductModelToProductShoppingListWithCategoryClientOne(product)
    viewProductDetail(newProduct)
  }

  return (
    <article className="item">
      <h3 className="item__name" onClick={handleViewProductDetail}>
        {product.name}
      </h3>
      <div className="item__counter">
        <div className="itemslist__count item__count">
          <div>{count ? count : product?.stock?.count}</div>
        </div>
        {!count && (
          <button className="item__more" onClick={handleAddItemList}>
            <i className="item__icon">
              <Icons icon="more" />
            </i>
          </button>
        )}
      </div>
    </article>
  )
}
