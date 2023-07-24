'use client'
import React from 'react'
import Modal from './Modal'
import { useBearStore } from '@/store/store'
import Facture from './Facture'

export default function ShoppingCount() {
  const { viewDrive, historyListPending, shoppinList, dolar, changeViewDrive } =
    useBearStore((state) => state)

  return (
    <>
      {viewDrive && (
        <Modal>
          {historyListPending ? (
            <Facture
              changeViewDrive={changeViewDrive}
              shopping={historyListPending}
              dolar={dolar}
            />
          ) : (
            <Facture
              changeViewDrive={changeViewDrive}
              shopping={shoppinList}
              dolar={dolar}
            />
          )}
        </Modal>
      )}
    </>
  )
}
