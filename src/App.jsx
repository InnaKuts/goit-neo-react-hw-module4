import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { useState } from "react";
import { useError } from "./components/ErrorProvider/ErrorProvider";
import axios from "axios";
import { ImagesMockDataSource } from "./services/ImagesDataSource/ImagesMockDataSource";

function App() {
  const imagesDataSource = new ImagesMockDataSource();
  const { showError } = useError();

  const [images, setImages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({ query: "", page: 1 });
  const [hasHttpError, setHasHttpError] = useState(false);

  const handleImagesFetch = async (query = "") => {
    try {
      setIsSearching(true);
      setHasHttpError(false);

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
      if (axios.isAxiosError(error)) {
        setHasHttpError(true);
      } else {
        showError(error.message ?? "Something went wrong");
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleImagesFetch} isLoading={isSearching} />
      <main className="main">
        {hasHttpError ? (
          <ErrorMessage />
        ) : (
          <ImageGallery
            images={images}
            isLoading={isSearching}
            onLoadMore={() => handleImagesFetch()}
          />
        )}
      </main>
    </div>
  );
}

export default App;
