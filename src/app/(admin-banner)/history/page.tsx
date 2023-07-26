import Container from '@/components/Container'
import HistoryParse from '@/components/History/HistoryParse'
import { getHistorys } from '@/utils/api/history'
import React from 'react'

export default async function page() {
  const historys = await getHistorys()

  return (
    <Container textYellow="Historial" text="de venta">
      {historys ? (
        <HistoryParse historys={historys} />
      ) : (
        <div>Error al cargar</div>
      )}
    </Container>
  )
}
