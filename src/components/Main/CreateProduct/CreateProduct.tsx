'use client'
import Spinner from '@/atoms/Spinner'
import Button from '@/atoms/button/Button'
import Icons from '@/atoms/icons'
import Input from '@/atoms/input/Input'
import SelectCategory from '@/atoms/input/SelectCategory'
import useAlert from '@/hooks/useAlert'
import useView from '@/hooks/useView'
import { useBearStore } from '@/store/store'
import { EventFile } from '@/types/events'
import { Category, InputChange, NewItem } from '@/types/types'
import { uploadFiles } from '@/utils/cloduinary/files'
import { createProduct } from '@/utils/fetchApi'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
const INITIAL_STATE = {
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
  const handleChangeCreateProduct = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      const NEW_PRODUCT: NewItem = {
        ...newProduct,
        stock: Number(newProduct.stock) ?? 0,
        price: Number(newProduct.price) ?? 0,
      }
      const product = await createProduct(newProduct)

      const newItems: Category[] = [...items]
      const category = newItems.find(
        ({ name }) => name === product.product.category.name
      )
      if (category) {
        category.product.push(product.product)
        addItemsProducts(newItems)
        createAlert(
          `${product.product.name} agregado a ${category.name}`,
          false
        )
      } else {
        const newCategoryWithProduct: Category = {
          name: product.product.category.name,
          id: product.product.category.id,
          product: [product.product],
        }
        addItemsProducts([...newItems, newCategoryWithProduct])
        createAlert(
          `Categoria ${newCategoryWithProduct.name} creada y producto ${product.product.name} agregado.`,
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
  const handleViewCategory = () => {
    changeRefView(false)
    manualView(true)
  }
  const handleCloseCategory = () => {
    changeRefView(true)
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
      console.log({ file })
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
          <Input
            handleChange={handleChangeCreateProduct}
            value={newProduct.name}
            name="name"
            input
            label="Nombre"
            place="Ingresar nombre"
          />
          <Input
            handleChange={handleChangeCreateProduct}
            value={newProduct.note}
            name="note"
            label="Nota (Opcional)"
            place="Ingresar nota"
          />
          <div className="create__select">
            <SelectCategory
              handleChange={handleChangeCreateProduct}
              handleBlur={handleCloseCategory}
              handleFocus={handleViewCategory}
              value={newProduct.categoryName}
              category={category}
              view={view}
              handleChangeCategory={handleChangeCategory}
              name="categoryName"
              label="Categoria"
              place="Ingresar nueva categoria"
            />
          </div>
          <div className="create__numbers">
            <Input
              handleChange={handleChangeCreateProduct}
              value={newProduct.price}
              name="price"
              label="Precio"
              place="Precio"
              input
              type="number"
            />
            <Input
              handleChange={handleChangeCreateProduct}
              value={newProduct.stock}
              name="stock"
              label="Cantidad"
              place="Ingresar cantidad"
              input
              type="number"
            />
          </div>
          <div className="create__images">
            <div className="create__image">
              {loading ? (
                <Spinner height="6em" width="6em" />
              ) : (
                <>
                  {newProduct.image.length > 0 ? (
                    <Image
                      className="create__img"
                      src={newProduct.image}
                      alt={`Image del producto${newProduct.name}`}
                      width={80}
                      height={80}
                    />
                  ) : (
                    <i className="create__files">
                      <Icons icon="image-up" />
                    </i>
                  )}
                  <input
                    type="file"
                    onChange={handleUpImage}
                    className="create__file"
                  />
                </>
              )}
            </div>
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
