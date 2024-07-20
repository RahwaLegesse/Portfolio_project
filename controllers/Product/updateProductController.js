import productModel from "../../models/productModel.js";
import fs from "fs";
// Exporting the updateProductController function to be used in other parts of the application
export const updateProductController = async (req, res) => {
  try {
    // Extracting fields and files from the request
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
    
    // Validation checks to ensure required fields are provided and photo size is acceptable
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1MB" });
    }

    // Updating the product in the database using findByIdAndUpdate
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,  // Product ID from request parameters
      { ...req.fields, slug: slugify(name) },  // Fields to update along with a slug derived from the product name
      { new: true }  // Return the updated document
    );
    
    // If a photo is provided, update the photo field of the product
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);  // Read the photo file data
      products.photo.contentType = photo.type;  // Set the photo content type
    }

    // Save the updated product document
    await products.save();
    
    // Respond with a success message and the updated product details
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    // Catch any errors that occur during the process
    console.log(error);  // Log the error for debugging

    // Respond with an error message and details
    res.status(500).send({
      success: false,  // Indicate that the request failed
      error,  // Include the error details
      message: "Error in Updating Product",  // Provide an error message
    });
  }
};
