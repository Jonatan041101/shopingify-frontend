'use client'
import { CategoryName } from '@/types/types'
import React, { useEffect } from 'react'
import { useBearStore } from '@/store/store'
import CategoryItems from './CategoryItems'
import { ResponseCategoryWithProduct } from '@/types/response'
import { CategoryWithProductClient } from '@/types/parse'
import Item from './Item'

interface Props {
  products: ResponseCategoryWithProduct
}

export default function Items({ products }: Props) {
  const { addCategorys, addItemsProducts, items, searchNameItemOrCategory } =
    useBearStore((state) => state)
  useEffect(() => {
    const categorys: CategoryName[] = products.products.map(({ id, name }) => ({
      id,
      category: name,
    }))
    addCategorys(categorys)
    if (searchNameItemOrCategory.length === 0) {
      const categoryWithProducts = products.products.filter(
        ({ product }) => product.length > 0
      )
      const category: CategoryWithProductClient[] = categoryWithProducts.map(
        ({ name, id, product }) => ({
          category: name,
          id,
          product,
        })
      )
      addItemsProducts(category)
    }
  }, [])
  return (
    <div className="items">
      {items.map((category) => (
        <CategoryItems key={category.id} category={category}>
          {category.product.map((produdct) => (
            <Item key={produdct.id} product={produdct} />
          ))}
        </CategoryItems>
      ))}
    </div>
  )
}
