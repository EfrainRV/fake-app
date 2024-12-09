import Image from "next/image"
interface Props {
  userData: { 
    name: string, 
    email: string 
    image?: string
  };
}

export const UserCard = ({ userData }: Props) => {
  return (
    <div className="w-[350px] p-4 rounded-md bg-gray-100 flex flex-col justify-end gap-1">
        {
          userData.image ? (
            <div className="w-full h-40 flex justify-center">
              <Image 
                src={userData.image} 
                alt={userData.name}
                width={250}
                height={200}
                className="w-[250px] h-full object-cover rounded-md"
              />
            </div>
          ) : (
            <div className="w-full h-40 flex justify-center">
              <Image 
                src="/avatar.jpg" 
                alt="User avatar"
                width={250}
                height={200}
                loading="lazy"
                className="w-[250px] h-full object-cover rounded-md"
              />
            </div>
          )
        }
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
