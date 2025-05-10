import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={styles.gallery}>
        {images.map((image) => (
          <li key={image.id} className={styles.item}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
      <Loader />
    </>
  );
};

export default ImageGallery;
