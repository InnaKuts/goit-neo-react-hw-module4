import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, isLoading }) => {
  return (
    <>
      <ul className={styles.gallery}>
        {images.map((image) => (
          <li key={image.id} className={styles.item}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
      {isLoading && <Loader />}
      {images.length > 0 && (
        <button className={styles.button} disabled={isLoading}>
          Load more
        </button>
      )}
    </>
  );
};

export default ImageGallery;
