'use client'

interface Props {
  userData: { 
    name: string, 
    email: string 
  };
}

export const SaveButton = ({ userData }: Props) => {
  
  const handleSave = async () => {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);
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
