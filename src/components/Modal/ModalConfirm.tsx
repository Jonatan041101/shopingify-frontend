'use client'
import React from 'react'
import SelectYesNo from '@/components/Modal/SelectYesNo'
import { useBearStore } from '@/store/store'

export default function ModalConfirm() {
  const { viewModal, status, text, yesNoFunction, changeStatus } = useBearStore(
    (state) => state
  )
  const closeModal = () => {
    changeStatus(false, '', false, () => {})
  }

  return (
    <>
      {viewModal && (
        <SelectYesNo
          closeModal={closeModal}
          pickYesNo={yesNoFunction}
          status={status}
          text={text}
        />
      )}
    </>
  )
}
