import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SearchBar.module.css";
import { useError } from "../ErrorProvider/ErrorProvider";

const SearchBar = ({ onSearch, isLoading }) => {
  const { showError } = useError();

  const formik = useFormik({
    initialValues: {
      query: "",
    },
    validationSchema: Yup.object({
      query: Yup.string()
        .required("Search query is required")
        .min(3, "Search query must be at least 3 characters")
        .max(50, "Search query must not exceed 50 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await onSearch(values.query);
        resetForm({ values: { query: "" } });
      } catch (error) {
        showError(error.message ?? "Something went wrong");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
    if (Object.keys(formik.errors).length > 0) {
      Object.values(formik.errors).forEach((error) => {
        showError(error);
      });
    }
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={formik.values.query}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
