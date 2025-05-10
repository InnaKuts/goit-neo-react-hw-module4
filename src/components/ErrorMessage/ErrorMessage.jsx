import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>
        Sorry, there was an error loading images. Please try again later.
      </p>
    </div>
  );
};

export default ErrorMessage;
