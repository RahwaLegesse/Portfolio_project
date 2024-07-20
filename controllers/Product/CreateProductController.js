// Importing necessary modules and models
import productModel from "../../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

// Exporting the CreateProductController function to be used in other parts of the application
export const CreateProductController = async (req, res) => {
  try {
    // Destructuring fields and files from the request
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
    
    // Validate required fields and return appropriate error messages
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
        return res.status(500).send({ error: "Photo is required and should be less than 1MB" });
    }

    // Create a new product using the productModel
    const products = new productModel({ ...req.fields, slug: slugify(name) });

    // If there is a photo, read it and add it to the product
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    // Save the product to the database
    await products.save();

    // Respond with a success message and the created product
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    // Catch any errors and respond with an error message
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};
