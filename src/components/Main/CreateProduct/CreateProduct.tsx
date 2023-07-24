'use client'
import Button from '@/atoms/button/Button'
import useAlert from '@/hooks/useAlert'
import useView from '@/hooks/useView'
import { useBearStore } from '@/store/store'
import { EventFile, EventInput } from '@/types/events'
import { uploadFiles } from '@/utils/cloduinary/files'
import { createProduct } from '@/utils/api/product'
import {
  parseCategoryToAdd,
  parseProductToAdd,
} from '@/utils/parse/productWithCategory'
import { newProductToAdd } from '@/utils/searching/searchingProductOrCategory'
import React, { useReducer, useRef } from 'react'
import UpImage from './UpImage'
import RestForm from './RestForm'
import { INITIAL_STATE_REDUCER, reducer } from './reduder'
import { InputChange } from '@/types/string'
import { CategoryWithProductClient } from '@/types/parse'

export default function CreateProduct() {
  const {
    products: items,
    category,
    changeViewCreate,
    addItemsProducts,
    changeStatus,
  } = useBearStore((state) => state)
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_REDUCER)
  const { view, changeView, manualView } = useView()
  const refCloseSelect = useRef<boolean>(true)
  const { createAlert } = useAlert()
  const handleChangeViewCreate = (confirm: boolean) => {
    if (confirm) {
      changeStatus(false, '', false, () => {})
      changeViewCreate(false)
    }
    changeStatus(false, '', false, () => {})
  }
  const handleViewModalConfirm = () => {
    changeStatus(
      false,
      'Esta seguro que desea cerrar la creacion del producto',
      true,
      handleChangeViewCreate
    )
  }
  const handleChangeCreateProduct = (evt: EventInput) => {
    const { name, value } = evt.target
    dispatch({
      type: '@change/new-product',
      payload: {
        name: name as InputChange,
        value: value,
      },
    })
  }
  const handleCreateProduct = async () => {
    try {
      if (state.loading)
        return createAlert('La imagen esta cargando espere...', true)
      if (state.newProduct.name.trim().length === 0)
        return createAlert('Debe agregar un nombre al producto', true)
      if (state.newProduct.category.trim().length === 0)
        return createAlert('Debe agregar una categoria', true)
      if (
        isNaN(Number(state.newProduct.price)) ||
        isNaN(Number(state.newProduct.stock))
      ) {
        return createAlert(`El precio  y el stock deben ser numeros`, true)
      }
      const { NEW_PRODUCT } = parseProductToAdd(state.newProduct)
      const productCreated = await createProduct(NEW_PRODUCT)
      if (productCreated) {
        const { product } = productCreated

        const { newItems, category } =
          newProductToAdd<CategoryWithProductClient>(
            items,
            product.category.name
          )
        if (category) {
          category.product.push(product)
          addItemsProducts(newItems)
          createAlert(`${product.name} agregado a ${category.category}`, false)
        } else {
          const { newCategoryWithProduct } = parseCategoryToAdd(product)
          addItemsProducts([...newItems, newCategoryWithProduct])
          createAlert(
            `Categoria ${newCategoryWithProduct.category} creada y producto ${product.name} agregado.`,
            false
          )
        }
        handleChangeViewCreate(true)
        dispatch({ type: '@reset/new-product' })
      }
    } catch (error) {
      console.log({ error })
    }
  }
  const changeRefView = (view: boolean) => {
    refCloseSelect.current = view
  }
  const handleChangeCategory = (category: string) => {
    dispatch({
      type: '@change/new-product',
      payload: {
        name: 'category',
        value: category,
      },
    })
    changeView()
  }
  const closeViewCategory = () => {
    if (refCloseSelect.current) {
      manualView(false)
    }
  }
  const handleUpImage = async (evt: EventFile) => {
    try {
      dispatch({ type: '@change/loading', payload: true })
      const file = await uploadFiles(evt)
      if (file) {
        dispatch({
          type: '@change/new-product',
          payload: {
            name: 'image',
            value: file.secure_url,
          },
        })
      }
      dispatch({ type: '@change/loading', payload: false })
      createAlert('Imagen subida', false)
    } catch (error) {
      createAlert('No se pudo subir la imagen', true)
    }
  }

  return (
    <div className="create" onClick={closeViewCategory}>
      <div className="create__div">
        <h2 className="create__title">Agregar nuevo producto</h2>
        <div className="create__inputs">
          <RestForm
            category={category}
            changeRefView={changeRefView}
            handleChangeCategory={handleChangeCategory}
            handleChangeCreateProduct={handleChangeCreateProduct}
            manualView={manualView}
            newProduct={state.newProduct}
            view={view}
          />
          <div className="create__images">
            <UpImage
              handleUpImage={handleUpImage}
              image={state.newProduct.image}
              loading={state.loading}
              name={state.newProduct.name}
            />
          </div>
        </div>
      </div>
      <div className="create__buttons">
        <Button
          classN="button__white"
          click={handleViewModalConfirm}
          text="Cancelar"
        />
        <Button
          classN="button__yellow"
          click={handleCreateProduct}
          text="Guardar"
        />
      </div>
    </div>
  )
}
