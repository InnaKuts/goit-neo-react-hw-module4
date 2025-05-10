import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { ImagesMockDataSource } from "./services/ImagesDataSource/ImagesMockDataSource";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const imagesDataSource = new ImagesMockDataSource();

  const [images, setImages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    try {
      setIsSearching(true);
      setImages([]);
      const images = await imagesDataSource.getImages(query);
      setImages(images);
    } catch (error) {
      toast.error(error.message ?? "Something went wrong");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="app">
      <Toaster position="top-right" />
      <SearchBar onSearch={handleSearch} isLoading={isSearching} />
      <main className="main">
        <ImageGallery images={images} isLoading={isSearching} />
      </main>
    </div>
  );
}

export default App;
