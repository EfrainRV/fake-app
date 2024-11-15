import React from 'react'
import { UserCard } from './UserCard'

interface Props {
  users: { 
    name: string, 
    email: string 
  }[];
}

export const UsersListContainer = ({ users }: Props) => {
  return (
    <div className='w-full mt-12 px-4 flex flex-wrap gap-2'>
      {
        users.map((user) => (
          <UserCard key={user.name} userData={user} />
        ))
      }
    </div>
  )
}
