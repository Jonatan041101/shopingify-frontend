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
import React, { useEffect, useReducer, useRef, useState } from 'react'
import UpImage from './UpImage'
import RestForm from './RestForm'
import { INITIAL_STATE_REDUCER, reducer } from './reduder'
import { InputChange } from '@/types/string'
import { CategoryWithProductClient } from '@/types/parse'
import { controlForm } from '@/utils/controls-forms'
import { parseProductModel } from '@/utils/parse/parseProductModel'
import Spinner from '@/atoms/Spinner'
import { ProductModel } from '@/types/model'

export default function CreateProduct() {
  const {
    products,
    category,
    updatingProduct,
    textCreated,
    changeViewCreate,
    addItemsProducts,
    changeStatus,
    handleLoadingChange,
    optionsUpdateProduct,
  } = useBearStore((state) => state)
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_REDUCER)
  // const [loading,setLoading] = useState<boolean>(false)
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
      changeViewCreate(false, '')
      optionsUpdateProduct(null)
    }
    changeStatus(false, '', false, () => {})
    handleLoadingChange(false)
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
  console.log({ products })

  const handleCreateProduct = async () => {
    try {
      console.log({ state })
      const controls = controlForm(
        state.loading,
        createAlert,
        state.newProduct.name,
        state.newProduct.category,
        state.newProduct.price,
        state.newProduct.stock.count
      )
      if (!controls) {
        return
      }
      const { NEW_PRODUCT } = parseProductToAdd(state.newProduct)
      if (NEW_PRODUCT.id) {
        dispatch({ type: '@form/send-end', payload: true })
        const productUpdate = await updateProduct(NEW_PRODUCT)
        dispatch({ type: '@form/send-end', payload: false })
        if (productUpdate) {
          const newProducts = [...products]
          let categoryBefore = false
          newProducts.forEach((product) => {
            const PRODUCT_UPDATE = product.product.find(
              ({ id }) => id === productUpdate.product.id
            )
            if (PRODUCT_UPDATE) {
              PRODUCT_UPDATE.price = productUpdate.product.price
              PRODUCT_UPDATE.name = productUpdate.product.name
              PRODUCT_UPDATE.image = productUpdate.product.image
              PRODUCT_UPDATE.note = productUpdate.product.note
              PRODUCT_UPDATE.stock.count = productUpdate.product.stock.count
              categoryBefore =
                product.category === productUpdate.product.category.name
            }
          })

          if (!categoryBefore) {
            newProducts.forEach((category) => {
              category.product = category.product.filter(
                ({ id }) => id !== productUpdate.product.id
              )
            })
            const category = newProducts.find(
              ({ category }) => category === productUpdate.product.category.name
            )
            const PRODUCT: ProductModel = {
              category: {
                id: productUpdate.product.category.id,
                name: productUpdate.product.category.name,
                product: [],
              },
              categoryId: productUpdate.product.categoryId,
              id: productUpdate.product.id,
              image: productUpdate.product.image,
              name: productUpdate.product.name,
              note: productUpdate.product.note,
              price: productUpdate.product.price,
              stock: {
                count: productUpdate.product.stock.count,
                id: productUpdate.product.stock.id,
              },
            }
            if (category) {
              category.product.push(PRODUCT)
              addItemsProducts([...newProducts])
            } else {
              const { newCategoryWithProduct } = parseCategoryToAdd(PRODUCT)
              addItemsProducts([...newProducts, newCategoryWithProduct])
            }
          } else {
            addItemsProducts([...newProducts])
          }
        }
        createAlert(
          `Producto ${productUpdate?.product.name} actualizado`,
          false
        )
      } else {
        dispatch({ type: '@form/send-end', payload: true })
        console.log('HOLA')

        const productCreated = await createProduct(NEW_PRODUCT)
        dispatch({ type: '@form/send-end', payload: false })
        if (productCreated) {
          const { product } = productCreated
          const { newProductsList, category } =
            newProductToAdd<CategoryWithProductClient>(
              products,
              product.category.name
            )
          if (category) {
            category.product.push(product)
            addItemsProducts(newProductsList)
            createAlert(
              `${product.name} agregado a ${category.category}`,
              false
            )
          } else {
            const { newCategoryWithProduct } = parseCategoryToAdd(product)
            addItemsProducts([...newProductsList, newCategoryWithProduct])
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
        <h2 className="create__title">{textCreated}</h2>
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
        {state.loadingForm ? (
          <div className="create__loader">
            <Spinner user height="3.5em" width="3.5em" />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
