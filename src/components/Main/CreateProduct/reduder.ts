import { InputChange, NewItem } from '@/types/types'

const INITIAL_STATE: NewItem = {
  categoryName: '',
  image: '',
  name: '',
  note: '',
  price: '',
  stock: '',
}
interface StateReducer {
  newProduct: NewItem
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
