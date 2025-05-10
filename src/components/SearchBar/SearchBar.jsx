import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
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
    onSubmit: (values, { resetForm }) => {
      onSearch(values.query);
      resetForm();
    },
    onError: (errors) => {
      console.log(errors);
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
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
          onBlur={(e) => {
            formik.handleBlur(e);
            if (formik.errors.query) {
              toast.error(formik.errors.query);
            }
          }}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
