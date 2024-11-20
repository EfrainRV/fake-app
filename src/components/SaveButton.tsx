'use client'

import { toast } from "react-toastify";

interface Props {
  userData: { 
    name: string, 
    email: string 
  };
  userImage: string;
  setUserImage: (userImage: string) => void;
  setUserData: (userData: { name: string, email: string }) => void;
  getUsers: (page: number, limit: number) => Promise<void>;
}

export const SaveButton = ({ userData, setUserData, getUsers, userImage, setUserImage }: Props) => {
  
  const handleSave = async () => {
    if (!userData.name || !userData.email || !userImage) {
      // console.log('No hay datos para guardar');
      toast.error('Faltan datos para guardar');
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        image: userImage
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // console.log(response);

    if (!response.ok) {
      toast.error('Error al guardar el usuario');
      return;
    }

    getUsers(1, 5);
    setUserData({ name: '', email: '' });
    setUserImage('');
    toast.success('Usuario guardado');
    // console.log(`Guardando usuario: ${userData.name} - ${userData.email}`);
  }

  return (
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSave}
    >
      Guardar usuario
    </button>
  )
}
