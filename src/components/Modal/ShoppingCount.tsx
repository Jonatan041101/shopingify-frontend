'use client'
import React, { useState } from 'react'
import Modal from './Modal'
import { useBearStore } from '@/store/store'

export default function ShoppingCount() {
  const { viewDrive, historyListPending, shoppinList } = useBearStore(
    (state) => state
  )
  return (
    <>
      {viewDrive && (
        <Modal>
          {historyListPending
            ? historyListPending.map(({ product, id }) => (
                <div key={id} className="facture">
                  {product.map((product) => (
                    <article className="" key={product.id}>
                      <div>
                        <h3>{product.product.name}</h3>
                        <span>{product.count}</span>
                        <span>{product.product.price}</span>
                      </div>
                    </article>
                  ))}
                </div>
              ))
            : shoppinList.map((product) => (
                <div key={product.id}>
                  {product.product.map((prd) => (
                    <div key={prd.id}>{prd.product.name}</div>
                  ))}
                </div>
              ))}
        </Modal>
      )}
    </>
  )
}
