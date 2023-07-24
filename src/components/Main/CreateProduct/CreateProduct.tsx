'use client'
import Button from '@/atoms/button/Button'
import useAlert from '@/hooks/useAlert'
import useView from '@/hooks/useView'
import { useBearStore } from '@/store/store'
import { EventFile, EventInput } from '@/types/events'
import { uploadFiles } from '@/utils/cloduinary/files'
import { createProduct, updateProduct } from '@/utils/api/product'
import {
  parseCategoryToAdd,
  parseProductToAdd,
} from '@/utils/parse/productWithCategory'
import { newProductToAdd } from '@/utils/searching/searchingProductOrCategory'
import React, { useEffect, useReducer, useRef } from 'react'
import UpImage from './UpImage'
import RestForm from './RestForm'
import { INITIAL_STATE_REDUCER, reducer } from './reduder'
import { InputChange } from '@/types/string'
import { CategoryWithProductClient } from '@/types/parse'
import { controlForm } from '@/utils/controls-forms'
import { parseProductModel } from '@/utils/parse/parseProductModel'

export default function CreateProduct() {
  const {
    products,
    category,
    changeViewCreate,
    addItemsProducts,
    changeStatus,
    updatingProduct,
    optionsUpdateProduct,
  } = useBearStore((state) => state)
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_REDUCER)
  const { view, changeView, manualView } = useView()
  const refCloseSelect = useRef<boolean>(true)
  const { createAlert } = useAlert()
  useEffect(() => {
    if (updatingProduct) {
      const { replaceProduct } = parseProductModel(updatingProduct)
      dispatch({
        type: '@product/update',
        payload: replaceProduct,
      })
    }
  }, [])
  const handleChangeViewCreate = (confirm: boolean) => {
    if (confirm) {
      changeStatus(false, '', false, () => {})
      changeViewCreate(false)
      optionsUpdateProduct(null)
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
      console.log({ state })
      controlForm(
        state.loading,
        createAlert,
        state.newProduct.name,
        state.newProduct.category,
        state.newProduct.price,
        state.newProduct.stock.count
      )
      const { NEW_PRODUCT } = parseProductToAdd(state.newProduct)
      if (NEW_PRODUCT.id) {
        // const PRICE = Number(state.newProduct.price) / 525
        // state.newProduct.price = PRICE
        console.log({ NEW_PRODUCT })
        const productUpdate = await updateProduct(NEW_PRODUCT)
        if (productUpdate) {
          const productsUpdate = [...products]
          productsUpdate.forEach((product) => {
            const PRODUCT_UPDATE = product.product.find(
              ({ id }) => id === productUpdate.product.id
            )
            if (PRODUCT_UPDATE) {
              PRODUCT_UPDATE.price = productUpdate.product.price
              PRODUCT_UPDATE.name = productUpdate.product.name
              PRODUCT_UPDATE.image = productUpdate.product.image
              PRODUCT_UPDATE.note = productUpdate.product.note
              PRODUCT_UPDATE.stock.count = productUpdate.product.stock.count
            }
          })
          addItemsProducts([...productsUpdate])
        }
      } else {
        const productCreated = await createProduct(NEW_PRODUCT)
        if (productCreated) {
          const { product } = productCreated

          const { newItems, category } =
            newProductToAdd<CategoryWithProductClient>(
              products,
              product.category.name
            )
          if (category) {
            category.product.push(product)
            addItemsProducts(newItems)
            createAlert(
              `${product.name} agregado a ${category.category}`,
              false
            )
          } else {
            const { newCategoryWithProduct } = parseCategoryToAdd(product)
            addItemsProducts([...newItems, newCategoryWithProduct])
            createAlert(
              `Categoria ${newCategoryWithProduct.category} creada y producto ${product.name} agregado.`,
              false
            )
          }
        }
      }
      handleChangeViewCreate(true)
      dispatch({ type: '@reset/new-product' })
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
