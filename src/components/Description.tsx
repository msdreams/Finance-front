import React from "react"

type Props = {
  header: string,
  text: string
}

export const Description: React.FC<Props> = ({header, text}) => {
  return (
    <div className="flex flex-col gap-1 md:gap-2 p-4 md:p-6 bg-gray-600 min-h-28 rounded-lg shadow-lg opacity-95">
      <h3 className="font-bold text-lg md:text-2xl">{header}</h3>
      <p className="text-md md:text-lg">
        {text}
      </p>
    </div>
  )
}