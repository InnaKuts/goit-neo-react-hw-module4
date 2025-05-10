import Modal from "react-modal";
import styles from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.modalContent}>
        {image && (
          <img
            src={image.urls.full}
            alt={image.alt_description}
            className={styles.image}
          />
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
