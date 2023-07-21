'use client'
import Icons from '@/atoms/icons'
import { useBearStore } from '@/store/store'
import { Category } from '@/types/types'
import React from 'react'

export default function Searching() {
  const {
    copyItems,
    searchNameItemOrCategory,
    changeSearchName,
    addItemsFiltered,
  } = useBearStore((state) => state)
  const handleChangeFilterItems = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = evt.target
    changeSearchName(value)
    const searchCategory = copyItems.filter(({ category }) =>
      category.toLowerCase().includes(value.toLowerCase())
    )
    if (searchCategory.length === 0) {
      const newItems: Category[] = []
      copyItems.forEach((category) => {
        const newCategory: Category = {
          id: category.id,
          category: category.category,
          product: [],
        }
        category.product.forEach((product, index) => {
          if (product.name.toLowerCase().includes(value.toLowerCase())) {
            newCategory.product.push(product)
          }
          if (category.product.length - 1 === index) {
            if (newCategory.product.length >= 1) {
              newItems.push(newCategory)
            }
          }
        })
      })
      addItemsFiltered(newItems)
      return
    }
    addItemsFiltered(searchCategory)
  }
  return (
    <div className="products__input">
      <i className="products__icon">
        <Icons icon="search" />
      </i>
      <input
        onChange={handleChangeFilterItems}
        className="products__search"
        placeholder="Buscar productos"
        value={searchNameItemOrCategory}
      />
    </div>
  )
}
