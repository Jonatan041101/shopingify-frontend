import Spinner from '@/atoms/Spinner'
import Icons from '@/atoms/icons'
import { EventFile } from '@/types/events'
import Image from 'next/image'
import React from 'react'

interface Props {
  loading: boolean
  image: string
  name: string
  handleUpImage: (evt: EventFile) => void
}

export default function UpImage({
  handleUpImage,
  image,
  loading,
  name,
}: Props) {
  return (
    <div className="create__image">
      {loading ? (
        <Spinner height="6em" width="6em" />
      ) : (
        <>
          {image.length > 0 ? (
            <Image
              className="create__img"
              src={image}
              alt={`Image del producto${name}`}
              width={80}
              height={80}
            />
          ) : (
            <i className="create__files">
              <Icons icon="image-up" />
            </i>
          )}
          <input
            type="file"
            onChange={handleUpImage}
            className="create__file"
          />
        </>
      )}
    </div>
  )
}
