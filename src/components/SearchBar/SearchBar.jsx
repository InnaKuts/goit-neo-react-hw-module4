import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  return (
    <header className={styles.header}>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
