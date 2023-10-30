import Tesseract from 'tesseract.js';

export function Scan() {
  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');
    console.log(text);
  };

  return (
    <div>
      <input className="homePageBtn" type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}


