
interface Props {
  userData: { 
    name: string, 
    email: string 
  };
}

export const UserCard = ({ userData }: Props) => {
  return (
    <div className="w-[350px] p-4 rounded-md bg-gray-100">
      <div className="flex gap-3">
        <p className="text-gray-700">Name:</p>
        <p className="text-gray-700">{ userData.name }</p>
      </div>
      <div className="flex gap-3">
        <p className="text-gray-700">Email:</p>
        <p className="text-gray-700">{ userData.email }</p>
      </div>
    </div>
  )
}
