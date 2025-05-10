import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { ImagesMockDataSource } from "./services/ImagesDataSource/ImagesMockDataSource";
import { useState } from "react";

function App() {
  const imagesDataSource = new ImagesMockDataSource();

  const [images, setImages] = useState([]);

  const handleSearch = (query) => {
    imagesDataSource.getImages(query).then((images) => {
      setImages(images);
    });
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <main className="main">
        <ImageGallery images={images} />
      </main>
    </div>
  );
}

export default App;
