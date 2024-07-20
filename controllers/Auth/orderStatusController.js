import orderModel from "../../models/orderModel.js";

export const orderStatusController = async (req, res) => {
  try {
    // Extract the orderId from the request parameters and the status from the request body
    const { orderId } = req.params;
    const { status } = req.body;
    
    // Find the order by its ID and update its status
    const orders = await orderModel.findByIdAndUpdate(
      orderId,            // ID of the order to update
      { status },         // New status to set
      { new: true }       // Option to return the updated document
    );
    
    // Send the updated order details as the response
    res.json(orders);
  } catch (error) {
    // Log the error details for debugging purposes
    console.log(error);
    
    // Send an error response if something goes wrong
    res.status(500).send({
      success: false,
      message: "Error While Updating Order", // Error message indicating the failure
      error, // Include error details for debugging
    });
  }
};
