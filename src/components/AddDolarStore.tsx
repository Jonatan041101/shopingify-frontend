'use client'
import { useBearStore } from '@/store/store'
import { DolarModel } from '@/types/model'
interface Props {
  dolar: DolarModel
}
export default function AddDolarStore({ dolar }: Props) {
  const { addDolar } = useBearStore((state) => state)
  addDolar(dolar)
  return <div></div>
}
