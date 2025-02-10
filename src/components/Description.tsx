import React from "react"

type Props = {
  header: string,
  text: string
}

export const Description: React.FC<Props> = ({header, text}) => {
  return (
    <div className="flex  flex-col p-6 bg-gray-600 min-h-40 rounded-lg shadow-lg opacity-95">
      <h3 className="font-bold text-2xl pb-2">{header}</h3>
      <p className="text-lg">
        {text}
      </p>
    </div>
  )
}