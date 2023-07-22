import React from 'react'
interface Props {
  name: string
  handleChangeCategory: (name: string) => void
}
export default function Li({ handleChangeCategory, name }: Props) {
  const handleChange = () => {
    handleChangeCategory(name)
  }
  return (
    <li className="create__li" onClick={handleChange}>
      {name}{' '}
    </li>
  )
}
