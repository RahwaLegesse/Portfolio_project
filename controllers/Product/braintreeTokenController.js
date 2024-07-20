import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.Merchant_ID,
  publicKey: process.env.Public_Key,
  privateKey: process.env.Private_Key,
});

// Exporting the braintreeTokenController function so it can be used in other parts of the application
export const braintreeTokenController = async (req, res) => {
  try {
    // Using the Braintree gateway to generate a client token
    gateway.clientToken.generate({}, function (err, response) {
      // If there's an error generating the token, send a 500 status code with the error
      if (err) {
        res.status(500).send(err);
      } else {
        // If the token generation is successful, send the response back to the client
        res.send(response);
      }
    });
  } catch (error) {
    // Catch any other errors that might occur and log them
    console.log(error);
  }
};
  