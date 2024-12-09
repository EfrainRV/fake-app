'use client'

import { useState } from "react";

interface Props {
  dispatch: React.Dispatch<any>
}

export const SearchBar = ({ dispatch }: Props) => {
  const [inputQuery, setInputQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'SET_PAGE', payload: 1 });
    dispatch({ type: 'SET_QUERY', payload: inputQuery });
  }

  return (
    <form className="flex justify-center items-center gap-3 mt-8">
      <input className="h-10 border border-black rounded py-2 px-4"
        type="text" 
        placeholder="Search"
        value={inputQuery}
        onChange={ e => setInputQuery(e.target.value) }
      >{}</input>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSearch}
      >Buscar</button>
    </form>
  )
}
