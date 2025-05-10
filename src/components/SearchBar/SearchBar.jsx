import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, isLoading }) => {
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
        resetForm();
      } catch (error) {
        toast.error(error.message ?? "Something went wrong");
      }
    },
  });

  const handleBlur = (e) => {
    formik.handleBlur(e);
    if (formik.touched.query && formik.errors.query) {
      toast.error(formik.errors.query);
    }
  };

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
          onBlur={handleBlur}
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
