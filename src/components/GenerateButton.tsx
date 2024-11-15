'use client'

import { faker } from '@faker-js/faker';

interface Props {
  setUserData: (userData: { name: string, email: string }) => void;
  userData: { 
    name: string, 
    email: string 
  };
}

export const GenerateButton = ({ setUserData }: Props) => {

  const handleGenerate = () =>{
    const name = faker.person.fullName();
    const email = faker.internet.email();
  
    console.log(name, email);
    setUserData(prevUser => ({...prevUser, name, email }));
  }

  return (
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleGenerate}
    >
      Generar usuario
    </button>
  )
}