import React from 'react'
import FormLogin from './FormLogin'
import ImageLog from './ImageLog'
import Regaleria from './Regaleria'

export default function LoginComponent() {
  return (
    <div className="login">
      <div className="login__landing">
        <Regaleria />
        <ImageLog />
      </div>
      <div className="login__container">
        <FormLogin />
      </div>
    </div>
  )
}
