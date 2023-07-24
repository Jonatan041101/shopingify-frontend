'use client'
import React from 'react'
import ImageLog from './Login/ImageLog'
import Spinner from '@/atoms/Spinner'
import { useBearStore } from '@/store/store'
import Regaleria from './Login/Regaleria'

export default function LoaderHome() {
  const { loaderUser } = useBearStore((state) => state)
  return (
    <>
      {loaderUser && (
        <div className="loader__user">
          <ImageLog />
          <Regaleria />
          <Spinner height="3em" width="3em" user />
        </div>
      )}
    </>
  )
}
