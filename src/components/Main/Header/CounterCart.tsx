'use client'
import { useBearStore } from '@/store/store'
import { ListBuy } from '@/types/types'
import React from 'react'

const countItems = (list: ListBuy[], historyListPending: ListBuy[] | null) => {
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
