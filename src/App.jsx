import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { useState } from "react";
import { useError } from "./components/ErrorProvider/useError";
import axios from "axios";
import { ImagesUnsplashDataSource } from "./services/ImagesDataSource/ImagesUnsplashDataSource";
import { ImagesMockDataSource } from "./services/ImagesDataSource/ImagesMockDataSource";

const mock = false;
const imagesDataSource = mock
  ? new ImagesMockDataSource()
  : new ImagesUnsplashDataSource("newqD9k6gRLQFtr0rwWBhUivYetX-gCmsa7bC41BnXQ");

function App() {
  const { showError, persistentError, clearPersistentError } = useError();

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ query: "", page: 1 });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagesFetch = async (query = "") => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
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
      <SearchBar onSearch={handleImagesFetch} isLoading={isLoading} />
      <main className="main">
        {persistentError ? (
          <ErrorMessage message={persistentError} />
        ) : (
          <>
            {images.length > 0 && (
              <ImageGallery images={images} onImageClick={handleImageClick} />
            )}
            {isLoading && <Loader />}
            {images.length > 0 && (
              <LoadMoreBtn
                onClick={() => handleImagesFetch()}
                disabled={isLoading}
              />
            )}
          </>
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
