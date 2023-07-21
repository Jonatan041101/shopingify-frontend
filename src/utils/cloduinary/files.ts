import { EventFile } from '@/types/events'
import { CloudinaryResponse } from '@/types/response'
import { NO_ENVIRONMENT_VARIABLE } from '../api/loginApi'
import { Message } from '../apiHistory'
export const uploadFiles = async (evt: EventFile) => {
  try {
    const files = evt.target.files
    const data = new FormData()
    if (!process.env.NEXT_PUBLIC_API_CLOUDINARY)
      throw new Error(NO_ENVIRONMENT_VARIABLE)
    if (files) {
      data.append('file', files[0])
      data.append('upload_preset', 'regaleria')
      console.log(process.env.NEXT_PUBLIC_API_CLOUDINARY)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_API_CLOUDINARY}/image/upload`,
        { method: 'POST', body: data, cache: 'no-cache' }
      )
      const file = await res.json()
      if (!res.ok) {
        const File = file as Message
        throw new Error(File.message)
      }
      return file as CloudinaryResponse
    }
  } catch (error) {
    const ERROR = error as Error
    throw new Error(ERROR.message)
  }
}
