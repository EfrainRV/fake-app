'use client'

import { useRouter } from "next/navigation"

interface Props {
  sorted: boolean
}

export const PdfButton = ({ sorted }: Props) => {
  const router = useRouter()

  const handleRedirect = async () =>{
    if(sorted) {
      router.push("/document?sorted=true")
      return
    }
    router.push("/document")
  }

  return (
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleRedirect}
    >
      {sorted ? "Generar PDF (Ordenado)" : "Generar PDF"}
    </button>
  )
}
