'use client'

interface Props {
  userData: { 
    name: string, 
    email: string 
  };
  getUsers: () => void;
}

export const SaveButton = ({ userData, getUsers }: Props) => {
  
  const handleSave = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);

    if (response.ok) {
      getUsers();
    }
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
