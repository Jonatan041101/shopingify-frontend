import React from 'react'
import Button from '@/atoms/button/Button'
import Dates from './Dates'
import { addCategoryProduct } from '@/utils/addCategoryProduct'
import CategoryItems from '../Main/Products/CategoryItems'
import { HistoryShoppingModel } from '@/types/model'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import Item from '../Main/Products/Item'
import { getTotal } from '@/utils/total'

interface Props {
  product: HistoryShoppingModel
  dolar: number
  handleViewHistory: (historyItem: null) => void
}

export default function HistoryDetail({
  product,
  dolar,
  handleViewHistory,
}: Props) {
  const handleClose = () => {
    handleViewHistory(null)
  }
  const productSeparate = addCategoryProduct(product)
  const category: ProductShoppingListWithCategoryClient[] = productSeparate.map(
    (category) => ({
      id: category.id,
      category: category.category,
      product: category.product,
    })
  )
  const total = getTotal(category, dolar)

  return (
    <div className="historial__detail">
      <div>
        <Button icon="arrow-back" text="Volver" click={handleClose} />
      </div>
      <div className="historial__one">
        <div className="historial__title">
          <h3 className="historial__detail--name">{product.name}</h3>
          <Dates classN="historial__details" date={product.date} />
          <div className="historial__total">Total: ${Math.trunc(total)}</div>
        </div>
        {category.map((category) => (
          <CategoryItems key={category.id} category={category}>
            {category.product.map((product) => (
              <Item
                key={product.id}
                product={product.product}
                count={product.count}
              />
            ))}
          </CategoryItems>
        ))}
      </div>
    </div>
  )
}
