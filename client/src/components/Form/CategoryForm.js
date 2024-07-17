import React from "react";

// The CategoryForm component takes three props: handleSubmit, value, and setValue
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      {/* Form element with an onSubmit event handler */}
      <form onSubmit={handleSubmit}>
        
        {/* Input field for entering the new category */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value} // The current value of the input field
            onChange={(e) => setValue(e.target.value)} // Updates the value state when the input changes
          />
        </div>

        {/* Submit button for the form */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
