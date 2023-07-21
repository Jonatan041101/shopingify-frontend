import React from 'react'
import Button from '@/atoms/button/Button'
import Dates from './Dates'
import { addCategoryProduct } from '@/utils/addCategoryProduct'
import CategoryItems from '../Main/Products/CategoryItems'
import { HistoryShoppingModel } from '@/types/model'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import Item from '../Main/Products/Item'

interface Props {
  product: HistoryShoppingModel
  handleViewHistory: (historyItem: null) => void
}

export default function HistoryDetail({ product, handleViewHistory }: Props) {
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
  return (
    <div className="historial__detail">
      <Button icon="arrow-back" text="Back" click={handleClose} />
      <div className="historial__one">
        <div className="historial__title">
          <h3 className="historial__detail--name">{product.name}</h3>
          <Dates classN="historial__details" date={product.date} />
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
