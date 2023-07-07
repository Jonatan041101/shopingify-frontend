'use client'
import { CategoryName, GetProduct } from '@/types/types'
import React, { useEffect } from 'react'
import { useBearStore } from '@/store/store'
import CategoryItems from './CategoryItems'

interface Props {
  products: GetProduct
}

export default function Items({ products }: Props) {
  const { addCategorys, addItemsProducts, items, searchNameItemOrCategory } =
    useBearStore((state) => state)
  useEffect(() => {
    const categorys: CategoryName[] = products.products.map(({ id, name }) => ({
      id,
      name,
    }))
    addCategorys(categorys)
    if (searchNameItemOrCategory.length === 0) {
      const categoryWithProducts = products.products.filter(
        ({ product }) => product.length > 0
      )
      addItemsProducts(categoryWithProducts)
    }
  }, [])
  return (
    <div className="items">
      {items.map((category) => (
        <CategoryItems key={category.id} category={category} />
      ))}
    </div>
  )
}
