'use client'
import { useBearStore } from '@/store/store'
import React from 'react'
import ViewNoProducts from './ViewNoProducts'
import ListHistroyOrCreated from './ListHistroyOrCreated'
export default function ItemsList() {
  const { shoppinList, historyListPending } = useBearStore((state) => state)

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
        : shoppinList.map((products) => (
            <ListHistroyOrCreated
              key={products.id}
              list={shoppinList}
              products={products}
            />
          ))}
      {shoppinList.length === 0 && !historyListPending && <ViewNoProducts />}
      {historyListPending && historyListPending.length === 0 && (
        <ViewNoProducts />
      )}
    </div>
  )
}
