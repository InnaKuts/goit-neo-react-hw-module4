import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, isLoading, onLoadMore, onImageClick }) => {
  return (
    <>
      <ul className={styles.gallery}>
        {images.map((image) => (
          <li key={image.id} className={styles.item}>
            <ImageCard image={image} onClick={() => onImageClick(image)} />
          </li>
        ))}
      </ul>
      {isLoading && <Loader />}
      {images.length > 0 && (
        <button
          className={styles.button}
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
};

export default ImageGallery;
