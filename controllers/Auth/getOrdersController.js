import orderModel from "../../models/orderModel.js";

// Exporting the getOrdersController function to handle retrieving orders for a specific user
export const getOrdersController = async (req, res) => {
  try {
    // Fetching orders from the database where the 'buyer' field matches the ID of the currently authenticated user
    const orders = await orderModel
      .find({ buyer: req.user._id }) // Retrieves orders where the 'buyer' field matches the user's ID
      .populate("products", "-photo") // Populates the 'products' field, excluding the 'photo' field
      .populate("buyer", "name"); // Populates the 'buyer' field, including only the 'name' field
    
    // Sending the retrieved orders as a JSON response
    res.json(orders);
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
