'use client'
import Button from '@/atoms/button/Button'
import useAlert from '@/hooks/useAlert'
import { useBearStore } from '@/store/store'
import { HistoryCreate, ProductList } from '@/types/types'
import { completeList } from '@/utils/apiHistory'
import { historyPendingToListBuy } from '@/utils/convert'
import { createHistory } from '@/utils/fetchApi'
import React, { useRef, useState } from 'react'

export default function InputName() {
  const [name, setName] = useState('')
  const { createAlert } = useAlert()
  // const [status, setStatus] = useState<boolean>(false)
  const status = useRef<boolean>(false)
  const {
    list,
    historyListPending,
    historyId,
    nameList,
    changeNameList,
    changeListForView,
    existHistoryListPending,
    deleteListBuy,
    endHistoryPending,
    changeStatus,
  } = useBearStore((state) => state)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setName(value)
  }

  const handleSendNameList = async () => {
    if (historyListPending)
      return createAlert('No puedes tener mas de una lista activa.', true)
    changeNameList(name)
    setName('')
    let products: ProductList[] = []
    list.forEach(({ product }) => products.push(...product))
    const productsHistory: HistoryCreate = {
      nameList: name.length === 0 ? 'Lista de compras' : name,
      status: 'Pendiente',
      productsList: products.map(({ id, count }) => ({ productId: id, count })),
    }
    const historyCreated = await createHistory(productsHistory)
    const parseHistoryPendingToListBuy = historyPendingToListBuy(historyCreated)
    // ACA PASAMOS LA LISBUY Y EL ID DE EL HISTORY Y EN EL COMPONENTE ItemList se vuelve a renderizar
    // pero con los productos de "parseHistoryPendingToListBuy"
    console.log({ historyCreated, parseHistoryPendingToListBuy })

    existHistoryListPending(
      parseHistoryPendingToListBuy,
      historyCreated.history.id
    )
    changeListForView(true)
  }
  const handleEndList = async (status: boolean) => {
    const history = await completeList(status, historyId)

    createAlert(`Lista ${status ? 'Completada' : 'Cancelada'}`, false)
  }
  const handleDecision = (changeStatusHistoryApi: boolean) => {
    if (changeStatusHistoryApi) {
      handleEndList(status.current)
      // changeView()
      endHistoryPending()
      deleteListBuy()
      changeStatus(false, ``, false, () => {})
    } else {
      changeStatus(false, ``, false, () => {})
    }
  }
  const handleChangeStatusListEnd = (stat: boolean) => {
    // setStatus(() => status)
    status.current = stat
    // Paso la funcion handleDecision para ejecutarla en la modal y asi poder reutilizar esa modal con distintas funciones
    changeStatus(
      stat,
      `Quiere dar por ${
        stat ? 'COMPLETADA' : 'CANCELADA'
      } la lista ${nameList}?`,
      true,
      handleDecision
    )
  }
  return (
    <div className="inputname">
      {historyListPending ? (
        <div className="inputname__buttons">
          <Button
            click={() => handleChangeStatusListEnd(false)}
            text="Cancelar"
            classN="button__white"
          />
          <Button
            click={() => handleChangeStatusListEnd(true)}
            classN="button__blue"
            text="Listo"
          />
        </div>
      ) : (
        <div className="inputname__container">
          <input
            placeholder="Agregar Nombre"
            className="inputname__input"
            onChange={handleChange}
            value={name}
          />
          <button className="inputname__save" onClick={handleSendNameList}>
            Guardar
          </button>
        </div>
      )}
    </div>
  )
}
