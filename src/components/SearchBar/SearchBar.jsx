import { useFormik } from "formik";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (values.query.trim()) {
        onSearch(values.query);
        resetForm();
      }
    },
  });

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={formik.values.query}
          onChange={formik.handleChange}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
