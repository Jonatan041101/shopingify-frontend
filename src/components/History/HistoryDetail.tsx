import { Category, HistoryItem } from '@/types/types'
import React from 'react'
import Button from '@/atoms/button/Button'
import Dates from './Dates'
import { addCategoryProduct } from '@/utils/addCategoryProduct'
import CategoryItems from '../Main/Products/CategoryItems'

interface Props {
  product: HistoryItem
  handleViewHistory: (historyItem: null) => void
}

export default function HistoryDetail({ product, handleViewHistory }: Props) {
  const handleClose = () => {
    handleViewHistory(null)
  }
  const productSeparate = addCategoryProduct(product)
  const category: Category[] = productSeparate.map((category) => ({
    id: category.id,
    name: category.name,
    product: category.product.map((product) => ({
      ...product.product,
      count: product.count,
    })),
  }))
  return (
    <div className="historial__detail">
      <Button icon="arrow-back" text="Back" click={handleClose} />
      <div className="historial__one">
        <div className="historial__title">
          <h3 className="historial__detail--name">{product.name}</h3>
          <Dates classN="historial__details" date={product.date} />
        </div>
        {category.map((cate) => (
          <CategoryItems key={cate.id} category={cate} />
        ))}
      </div>
    </div>
  )
}
