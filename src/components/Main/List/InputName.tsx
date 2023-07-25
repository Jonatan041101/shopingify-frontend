'use client'
import Spinner from '@/atoms/Spinner'
import Button from '@/atoms/button/Button'
import useAlert from '@/hooks/useAlert'
import useView from '@/hooks/useView'
import { useBearStore } from '@/store/store'
import { ProductShoppingListModel } from '@/types/model'
import { CategoryWithProductClient } from '@/types/parse'
import { HistoryCreate, Keys } from '@/types/types'
import { completeList, createHistory } from '@/utils/api/history'
import { historyPendingToProductShoppingListWithCategoryClient } from '@/utils/parse/parseShoppingList'
import React, { useRef, useState } from 'react'

export default function InputName() {
  const [name, setName] = useState('')
  const { view: loading, handleLoading } = useView()
  // const { view: loadingList, handleLoading: handleLoadingList } = useView()
  const { createAlert } = useAlert()
  const status = useRef<boolean>(false)
  const {
    shoppinList: list,
    historyListPending,
    historyId,
    nameList,
    loading: LOADING,
    products,
    handleLoadingChange,
    changeNameList,
    changeListForView,
    existHistoryListPending,
    deleteListBuy,
    endHistoryPending,
    changeStatus,
    addItemsProducts,
  } = useBearStore((state) => state)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setName(value)
  }
  const handleSendNameList = async () => {
    try {
      if (historyListPending)
        return createAlert('No puedes tener mas de una lista activa.', true)
      changeNameList(name)
      setName('')
      let products: ProductShoppingListModel[] = []
      list.forEach(({ product }) => products.push(...product))
      const productsHistory: HistoryCreate = {
        nameList: name.length === 0 ? 'Lista de compras' : name,
        status: 'Pendiente',
        productsList: products.map(({ id, count, product }) => ({
          productId: id.length === 0 ? product.id : id,
          count,
        })),
      }
      handleLoading(true)
      const historyCreated = await createHistory(productsHistory)
      if (historyCreated) {
        const { history } = historyCreated
        handleLoading(false)
        const parseHistoryPendingToListBuy =
          historyPendingToProductShoppingListWithCategoryClient(history)
        // ACA PASAMOS LA LISBUY Y EL ID DE EL HISTORY Y EN EL COMPONENTE ItemList se vuelve a renderizar
        // pero con los productos de "parseHistoryPendingToListBuy"

        existHistoryListPending(
          parseHistoryPendingToListBuy,
          historyCreated.history.id
        )
        changeListForView(true)
        createAlert(`Lista ${historyCreated.history.name} creada`, false)
      }
    } catch (error) {
      console.log({ error })
    }
  }
  const handleEndList = async (status: boolean) => {
    try {
      console.log({ status, historyId })

      const history = await completeList(status, historyId)
      if (history) {
        if (history.history.status === 'Cancelado') {
          handleLoadingChange(false)
          endHistoryPending()
          deleteListBuy()
          return createAlert(
            `La lista ${history.history.name} fue cancelada`,
            false
          )
        }
        if (history.products.length === 0)
          createAlert(
            `Lista ${status ? 'Completada' : 'Cancelada'} sin cambios`,
            false
          )
        handleLoadingChange(false)
        endHistoryPending()
        deleteListBuy()
        const newProductUpdating: CategoryWithProductClient[] = []

        let caching: Keys = {}
        products.forEach((category) => {
          const newCateoory: CategoryWithProductClient = {
            category: category.category,
            id: category.id,
            product: [],
          }
          category.product.forEach((product, index) => {
            let existStockProduct = false
            history.products.forEach((stock) => {
              let productUpdating = {
                ...product,
              }
              if (caching[product.id]) {
              } else {
                console.log({ productId: product.id })
                if (product.id === stock.productId) {
                  productUpdating.stock.count = stock.count
                  caching[product.id] = product.id
                  existStockProduct = true
                  newCateoory.product.push(productUpdating)
                }
              }
            })
            if (!existStockProduct) {
              newCateoory.product.push({ ...product })
            }
            if (category.product.length - 1 === index) {
              newProductUpdating.push(newCateoory)
            }
          })
        })
        addItemsProducts([...newProductUpdating])
      }
      createAlert(`Lista ${status ? 'Completada' : 'Cancelada'}`, false)
    } catch (error) {
      console.log({ error })
    }
  }
  const handleDecision = (changeStatusHistoryApi: boolean) => {
    if (changeStatusHistoryApi) {
      handleEndList(status.current)
      changeStatus(false, ``, false, () => {})
    } else {
      changeStatus(false, ``, false, () => {})
    }
  }
  const handleChangeStatusListEnd = (stat: boolean) => {
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
  console.log({ LOADING })

  return (
    <>
      <div className="inputname">
        <>
          {LOADING ? (
            <Spinner height="3.5em" width="3.5em" />
          ) : historyListPending ? (
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
              <button
                className="inputname__save"
                disabled={loading}
                onClick={handleSendNameList}
              >
                {loading ? <Spinner height="1.2em" width="1.2em" /> : 'Guardar'}
              </button>
            </div>
          )}
        </>
      </div>
    </>
  )
}
