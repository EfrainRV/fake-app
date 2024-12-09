
interface Props {
  page: number;
  totalUsers: number;
  limit: number;
  dispatch: React.Dispatch<any>;
}

export const Paginator = ({
  page,
  totalUsers,
  limit,
  dispatch
}: Props) => {
  const totalPages = Math.ceil(totalUsers / limit);

  const handlePrev = () => {
    if (page === 1) return;
    dispatch({ type: 'SET_PAGE', payload: page - 1 });
  }

  const handleNext = () => {
    if (page === totalPages) return;
    dispatch({ type: 'SET_PAGE', payload: page + 1 });
  }

  return (
    <div className='w-full mt-3 flex justify-center'>
      <div className='flex gap-2 items-baseline'>
        <button 
          onClick={handlePrev}
          className='px-4 py-2 bg-gray-200 rounded-md'
        >Anterior</button>
        <p>Página {page} de {totalPages}</p>
        <button
          onClick={handleNext}
          className='px-4 py-2 bg-gray-200 rounded-md'
        >Siguiente</button>
      </div>


    </div>
  )
}
