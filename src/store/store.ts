import { create } from 'zustand'
import { ProductDetail, productSlice } from './slice/productSlice'
import { Shopping, buySlice } from './slice/shoppingSlice'
import { CreateProduct, createSlice } from './slice/createSlice'
import { Drive, driveSlice } from './slice/driveSlice'
import { AlertNotify, sliceAlert } from './slice/alertSlice'
import { Styles, styleSlice } from './slice/styleSlice'
import { FunctionsModal, sliceModal } from './slice/sliceModal'
import { Filter, sliceFilter } from './slice/sliceFilter'
import { UserSlice, userSlice } from './slice/userSlice'

export const useBearStore = create<
  Shopping &
    ProductDetail &
    CreateProduct &
    Drive &
    AlertNotify &
    Styles &
    FunctionsModal &
    Filter &
    UserSlice
>((...set) => ({
  ...buySlice(...set),
  ...productSlice(...set),
  ...createSlice(...set),
  ...driveSlice(...set),
  ...sliceAlert(...set),
  ...styleSlice(...set),
  ...sliceModal(...set),
  ...sliceFilter(...set),
  ...userSlice(...set),
}))
