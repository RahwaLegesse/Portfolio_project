import orderModel from "../../models/orderModel.js";

// Exporting the getAllOrdersController function for handling requests to retrieve all orders
export const getAllOrdersController = async (req, res) => {
  try {
    // Fetching all orders from the database
    const orders = await orderModel
      .find({}) // Retrieves all orders
      .populate("products", "-photo") // Populates the 'products' field, excluding the 'photo' field
      .populate("buyer", "name") // Populates the 'buyer' field, including only the 'name' field
      .sort({ createdAt: -1 }); // Sorts orders by creation date in descending order

    // Sending the retrieved orders as a JSON response
    res.json(orders);
    // Logging the retrieved orders to the console for debugging purposes
    console.log(orders);
  } catch (error) {
    // Logging the error to the console for debugging purposes
    console.log(error);

    // Sending an error response if something goes wrong
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders", // Message indicating an issue with fetching orders
      error, // Including error details for debugging
    });
  }
};
  