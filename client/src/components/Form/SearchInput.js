import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  // Destructure values and setValues from the useSearch hook
  const [values, setValues] = useSearch();
  // Get the navigate function from the useNavigate hook for navigation
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Make a GET request to the API endpoint with the search keyword
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      // Update the state with the search results
      setValues({ ...values, results: data });
      // Navigate to the search results page
      navigate("/search");
      // Log the updated values to the console
      console.log("values", values);
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
    }
  };
    return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;