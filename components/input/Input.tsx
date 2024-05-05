import React from 'react'

type Props = {
  placeholder: string
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ placeholder, className, onChange }: Props) {
  return (
    <input
      className="w-full h-8 px-2.5 text-sm placeholder-gray-400 font-normal border bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-2"
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}