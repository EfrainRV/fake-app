interface Props {
  userImage: string;
  setUserImage: (userImage: string) => void;
}

export const ImageForm = ({ setUserImage }: Props) => {

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setUserImage(data.url);
    } catch (error) {
      console.error(error); 
    }
  }

  return (
    <form>
      <input 
        type="file" 
        onChange={ handleChange }
        accept="image/png, image/jpeg"
      />
    </form>
  )
}
