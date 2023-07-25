import { CreateProductModel } from '@/types/sendBackend'
import { InputChange } from '@/types/string'

const INITIAL_STATE: CreateProductModel = {
  category: '',
  image: '',
  name: '',
  note: '',
  price: '',
  stock: {
    count: '',
  },
}
interface StateReducer {
  newProduct: CreateProductModel
  loading: boolean
  loadingForm: boolean
}
export const INITIAL_STATE_REDUCER: StateReducer = {
  newProduct: INITIAL_STATE,
  loading: false,
  loadingForm: false,
}
interface ChangeNewProduct {
  name: InputChange
  value: string
}

type Reduce =
  | {
      type: '@reset/new-product'
    }
  | {
      type: '@change/new-product'
      payload: ChangeNewProduct
    }
  | {
      type: '@change/loading'
      payload: boolean
    }
  | {
      type: '@product/update'
      payload: CreateProductModel
    }
  | {
      type: '@form/send-end'
      payload: boolean
    }
export const reducer = (state: StateReducer, action: Reduce) => {
  switch (action.type) {
    case '@product/update': {
      return {
        ...state,
        newProduct: { ...action.payload },
      }
    }
    case '@change/new-product': {
      if (action.payload.name === 'stock') {
        return {
          ...state,
          newProduct: {
            ...state.newProduct,
            stock: {
              ...state.newProduct.stock,
              count: action.payload.value,
            },
          },
        }
      }
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          [action.payload.name]: action.payload.value,
        },
      }
    }
    case '@reset/new-product': {
      return {
        ...state,
        newProduct: INITIAL_STATE,
      }
    }
    case '@change/loading': {
      return {
        ...state,
        loading: action.payload,
      }
    }
    case '@form/send-end': {
      return {
        ...state,
        loadingForm: action.payload,
      }
    }
  }
}
