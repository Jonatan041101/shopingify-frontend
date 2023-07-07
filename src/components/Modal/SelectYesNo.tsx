'use client'
import React from 'react'
import Modal from './Modal'
import Button from '@/atoms/button/Button'
import Icons from '@/atoms/icons'

interface Props {
  text: string
  pickYesNo: (pick: boolean) => void
  closeModal: () => void
  status: boolean
}

export default function SelectYesNo({
  text,
  status,
  pickYesNo,
  closeModal,
}: Props) {
  return (
    <Modal>
      <div className="modal__select">
        <div className="modal__p">
          <i className="modal__close" onClick={closeModal}>
            <Icons icon="close" />
          </i>
          <p>{text}</p>
        </div>
        <div className="modal__buttons">
          <Button
            click={() => pickYesNo(false)}
            classN="button__white"
            text="Cancelar"
          />
          <Button
            click={() => pickYesNo(true)}
            classN={status ? 'button__blue' : 'button__red'}
            text="Si"
          />
        </div>
      </div>
    </Modal>
  )
}
