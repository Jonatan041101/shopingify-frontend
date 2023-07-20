import { EventFile, EventInput } from '@/types/events'
import { CloudinaryResponse } from '@/types/response'
import { NO_ENVIRONMENT_VARIABLE } from '../api/loginApi'
export const uploadFiles = async (evt: EventFile) => {
  try {
    const files = evt.target.files
    const data = new FormData()
    if (!process.env.NEXT_PUBLIC_API_CLOUDINARY)
      throw new Error(NO_ENVIRONMENT_VARIABLE)
    if (files) {
      data.append('file', files[0])
      data.append('upload-preset', 'regaleria')
      const res = await fetch(
        `ttps://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_API_CLOUDINARY}/image/upload`,
        { method: 'POST', body: data, cache: 'no-cache' }
      )
      const file = (await res.json()) as CloudinaryResponse
      return file
    }
  } catch (error) {
    console.log({ error })
  }
}
