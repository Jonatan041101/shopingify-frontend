'use client'
import { useBearStore } from '@/store/store'
import { historyPendingToListBuy } from '@/utils/convert'
import { getHistoryPending } from '@/utils/fetchApi'
import React, { useEffect } from 'react'

export default function SearchPendingHistory() {
  const { existHistoryListPending, changeNameList, changeListForView } =
    useBearStore((state) => state)
  useEffect(() => {
    const fetchToPending = async () => {
      try {
        const historyPending = await getHistoryPending()
        if (typeof historyPending === 'string') throw new Error(historyPending)

        const parseHistoryPendingToListBuy =
          historyPendingToListBuy(historyPending)
        // ACA PASAMOS LA LISBUY Y EL ID DE EL HISTORY
        existHistoryListPending(
          parseHistoryPendingToListBuy,
          historyPending.history.id
        )
        changeNameList(historyPending.history.name)
        if (parseHistoryPendingToListBuy.length > 0) {
          changeListForView(true)
        }
        // No obtengo el date y el status de el history por si las dudas
      } catch (error) {
        console.log({ error })
      }
    }
    fetchToPending()
  }, [])
  return <div></div>
}
