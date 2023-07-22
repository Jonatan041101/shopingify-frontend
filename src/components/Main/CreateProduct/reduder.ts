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
}
export const INITIAL_STATE_REDUCER: StateReducer = {
  newProduct: INITIAL_STATE,
  loading: false,
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
export const reducer = (state: StateReducer, action: Reduce) => {
  switch (action.type) {
    case '@change/new-product': {
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
  }
}
