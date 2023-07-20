'use client'
import Input from '@/atoms/input/Input'
import React from 'react'

export default function page() {
  return (
    <div className="login">
      <Input
        handleChange={() => {}}
        label="Nombre de usuario"
        name="name"
        place="Usuario"
        value=""
        iconLeft="user"
        input
      />
      <Input
        handleChange={() => {}}
        label="Contraseña"
        name="categoryName"
        place="Contraseña"
        value=""
        iconLeft="padlock"
        iconRigth="visibility"
        input
      />
    </div>
  )
}
