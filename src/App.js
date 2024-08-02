import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true`)
      // .then(res => res.json())
      axios.get('http://localhost:8000')
      .then(res => res.data)
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [searchTerm]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setSearchTerm(text)} />
      {!isLoading && images.length === 0 && <h1 className="text-center text-6xl mt-32">No Images Found</h1>}
      {isLoading ? <h1 className="text-center text-6xl mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
            <ImageCard key={image.id} image={image}/>
        ))}
      </div>}
    </div>
  );
}

export default App;
