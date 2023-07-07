'use client'
import React from 'react'
import Spinner from './Spinner'
import useAlert from '@/hooks/useAlert'
// ERROR
export default function Alert() {
  const { textAlert, isError } = useAlert()
  return (
    <>
      {textAlert && (
        <div className="alert">
          <div className="alert__container">
            <div className="alert__text">
              {isError ? '🚫' : '✅'} {textAlert}
            </div>
            {/* <Spinner /> */}
          </div>
        </div>
      )}
    </>
  )
}
