'use client'
import Button from '@/atoms/button/Button'
import useAlert from '@/hooks/useAlert'
import useView from '@/hooks/useView'
import { useBearStore } from '@/store/store'
import { EventFile, EventInput } from '@/types/events'
import { InputChange, NewItem } from '@/types/types'
import { uploadFiles } from '@/utils/cloduinary/files'
import { createProduct } from '@/utils/fetchApi'
import {
  parseCategoryToAdd,
  parseProductToAdd,
} from '@/utils/parse/productWithCategory'
import { newProductToAdd } from '@/utils/parse/searchingProductOrCategory'
import React, { useRef, useState } from 'react'
import UpImage from './UpImage'
import RestForm from './RestForm'
const INITIAL_STATE: NewItem = {
  categoryName: '',
  image: '',
  name: '',
  note: '',
  price: '',
  stock: '',
}
export default function CreateProduct() {
  const { items, category, changeViewCreate, addItemsProducts } = useBearStore(
    (state) => state
  )
  const [newProduct, setNewProduct] = useState<NewItem>(INITIAL_STATE)
  const [loading, setLoading] = useState<boolean>(false)
  const { view, changeView, manualView } = useView()
  const refCloseSelect = useRef<boolean>(true)
  const { createAlert } = useAlert()
  const handleChangeViewCreate = () => {
    changeViewCreate(false)
  }
  const handleChangeCreateProduct = (evt: EventInput) => {
    const { name, value } = evt.target
    setNewProduct({
      ...newProduct,
      [name as InputChange]: value,
    })
  }
  const handleCreateProduct = async () => {
    try {
      if (isNaN(Number(newProduct.price)) || isNaN(Number(newProduct.stock))) {
        throw new Error(`El precio  y el stock deben ser numeros`)
      }
      const { NEW_PRODUCT } = parseProductToAdd(newProduct)
      const { product } = await createProduct(NEW_PRODUCT)
      const { newItems, category } = newProductToAdd(
        items,
        product.category.name
      )
      if (category) {
        category.product.push(product)
        addItemsProducts(newItems)
        createAlert(`${product.name} agregado a ${category.name}`, false)
      } else {
        const { newCategoryWithProduct } = parseCategoryToAdd(product)
        addItemsProducts([...newItems, newCategoryWithProduct])
        createAlert(
          `Categoria ${newCategoryWithProduct.name} creada y producto ${product.name} agregado.`,
          false
        )
      }
      handleChangeViewCreate()
      setNewProduct(INITIAL_STATE)
    } catch (error) {
      console.log({ error })
    }
  }
  const changeRefView = (view: boolean) => {
    refCloseSelect.current = view
  }
  const handleChangeCategory = (category: string) => {
    setNewProduct({
      ...newProduct,
      categoryName: category,
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
      setLoading(() => true)
      const file = await uploadFiles(evt)
      if (file) {
        setNewProduct({ ...newProduct, image: file?.secure_url })
      }
      setLoading(() => false)
    } catch (error) {
      console.log({ error })
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
            newProduct={newProduct}
            view={view}
          />
          <div className="create__images">
            <UpImage
              handleUpImage={handleUpImage}
              image={newProduct.image}
              loading={loading}
              name={newProduct.name}
            />
          </div>
        </div>
      </div>
      <div className="create__buttons">
        <Button
          classN="button__white"
          click={handleChangeViewCreate}
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
