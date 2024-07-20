import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../../models/orderModel.js";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.Merchant_ID,
  publicKey: process.env.Public_Key,
  privateKey: process.env.Private_Key,
});
//use this code 5555 5555 5555 4444
// Exporting the brainTreePaymentController function so it can be used in other parts of the application
export const brainTreePaymentController = async (req, res) => {
  try {
    // Destructure nonce and cart from the request body
    const { nonce, cart } = req.body;

    // Initialize total to 0
    let total = 0;

    // Iterate over each item in the cart to calculate the total price
    cart.map((i) => {
      total += i.price;
    });

    // Create a new transaction using the Braintree gateway
    let newTransaction = gateway.transaction.sale(
      {
        amount: total, // Set the total amount for the transaction
        paymentMethodNonce: nonce, // Use the provided payment method nonce
        options: {
          submitForSettlement: true, // Automatically submit the transaction for settlement
        },
      },
      // Callback function to handle the result of the transaction
      function (error, result) {
        // If the transaction was successful
        if (result) {
          // Create a new order in the database
          const order = new orderModel({
            products: cart, // Store the cart products in the order
            payment: result, // Store the transaction result in the order
            buyer: req.user._id, // Associate the order with the buyer's user ID
          }).save();

          // Respond with a success message
          res.json({ ok: true });
        } else {
          // If there was an error with the transaction, respond with a 500 status and the error message
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    // Catch any other errors that might occur and log them
    console.log(error);
  }
};
