'use client'
import { useBearStore } from '@/store/store'
import { ProductShoppingListWithCategoryClient } from '@/types/parse'
import React from 'react'

const countItems = (
  list: ProductShoppingListWithCategoryClient[],
  historyListPending: ProductShoppingListWithCategoryClient[] | null
) => {
  let count = 0
  if (historyListPending) {
    historyListPending.forEach(({ product }) => (count += product.length))
    return { count }
  }
  list.forEach(({ product }) => (count += product.length))
  return { count }
}

export default function CounterCart() {
  const { list, historyListPending } = useBearStore((state) => state)
  const { count } = countItems(list, historyListPending)
  return <span className="header__counter">{count}</span>
}
