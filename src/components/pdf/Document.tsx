import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from "react"

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  image?: string;
}

interface Props {
  users: User[];
}

export const Document = ({ users }: Props) => {
  const documentRef = useRef(null);

  const handleGenerate = async () =>{
    const element = documentRef.current;
    try {
      if (!element) {
        toast.error('Element not found');
        return;
      }
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'letter'
      });

      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = canvas.height * pageWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('users.pdf');
      toast.success('PDF generado');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-full max-w-[800px] mx-auto px-8 bg-white" ref={documentRef}>
        <h1 className="text-4xl text-center py-4">Faker App</h1>
        <p className="my-4 text-lg">Usuarios en la BD:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Created At</th>
                <th className="py-2 px-4 text-left">Image</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.createdAt}</td>
                  <td className="py-2 px-4">
                    {user.image ? <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" /> : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 block mx-auto"
        onClick={handleGenerate}
      >
        Descargar PDF
      </button>
    </>
  );
};
