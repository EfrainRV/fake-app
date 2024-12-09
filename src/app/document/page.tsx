'use client'

import { Document } from "@/components/pdf/Document"
import { useEffect, useState, use } from "react"

type SearchParams = Promise <{
  [key: string]: string | boolean | undefined
}>

export default function Template( props: { searchParams: SearchParams }) {
  const { sorted } = use(props.searchParams)
  const [users, setUsers] = useState([])
  
  const getUsers = async () => {
    const response = await fetch("/api/users")
    const { users } = await response.json()
    if(sorted) {
      const sortedUsers = users.sort(() => Math.random() - 0.5);
      setUsers(sortedUsers);
      return;
    }
    setUsers(users)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Document users={users}/>
  )
}

