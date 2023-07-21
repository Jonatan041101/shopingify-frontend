'use client'
import { useBearStore } from '@/store/store'
import React from 'react'
import ViewNoProducts from './ViewNoProducts'
import ListHistroyOrCreated from './ListHistroyOrCreated'
export default function ItemsList() {
  const { list, historyListPending } = useBearStore((state) => state)
  console.log({ historyListPending, list })

  return (
    <div className="itemslist">
      {historyListPending
        ? historyListPending.map((products) => (
            <ListHistroyOrCreated
              key={products.id}
              list={historyListPending}
              products={products}
            />
          ))
        : list.map((products) => (
            <ListHistroyOrCreated
              key={products.id}
              list={list}
              products={products}
            />
          ))}
      {list.length === 0 && !historyListPending && <ViewNoProducts />}
      {historyListPending && historyListPending.length === 0 && (
        <ViewNoProducts />
      )}
    </div>
  )
}
