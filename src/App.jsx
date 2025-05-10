import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import { useState } from "react";
import { useError } from "./components/ErrorProvider/useError";
import axios from "axios";
import { ImagesMockDataSource } from "./services/ImagesDataSource/ImagesMockDataSource";

const imagesDataSource = new ImagesMockDataSource();

function App() {
  const { showError, persistentError, clearPersistentError } = useError();

  const [images, setImages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({ query: "", page: 1 });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagesFetch = async (query = "") => {
    try {
      setIsSearching(true);
      clearPersistentError();

      if (query) {
        setImages([]);
        setSearchParams({ query, page: 1 });
        const newImages = await imagesDataSource.getImages(query, 1);
        setImages(newImages);
      } else {
        const nextPage = searchParams.page + 1;
        const newImages = await imagesDataSource.getImages(
          searchParams.query,
          nextPage
        );
        setImages((prevImages) => [...prevImages, ...newImages]);
        setSearchParams((prev) => ({ ...prev, page: nextPage }));
      }
    } catch (error) {
      showError(
        error?.message ||
          error?.response?.data?.errors?.join("\n") ||
          "Sorry, there was an error loading images. Please try again later.",
        axios.isAxiosError(error)
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleImagesFetch} isLoading={isSearching} />
      <main className="main">
        {persistentError ? (
          <ErrorMessage message={persistentError} />
        ) : (
          <ImageGallery
            images={images}
            isLoading={isSearching}
            onLoadMore={() => handleImagesFetch()}
            onImageClick={handleImageClick}
          />
        )}
        <ImageModal
          isOpen={!!selectedImage}
          onClose={handleCloseModal}
          image={selectedImage}
        />
      </main>
    </div>
  );
}

export default App;
