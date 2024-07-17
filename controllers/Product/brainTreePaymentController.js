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

export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    gateway.transaction.sale(
      {
        amount: total.toFixed(2),
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (error) {
          console.error("Error processing payment:", error);
          return res.status(500).send(error);
        }
        
        if (result.success) {
          try {
            const order = new orderModel({
              products: cart,
              payment: result.transaction,
              buyer: req.user._id,
            });
            await order.save();
            return res.status(200).json({ success: true, message: "Payment successful", order });
          } catch (saveError) {
            console.error("Error saving order:", saveError);
            return res.status(500).json({ success: false, message: "Error saving order", error: saveError });
          }
        } else {
          console.error("Transaction failed:", result.message);
          return res.status(500).json({ success: false, message: "Transaction failed", error: result.message });
        }
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, message: "Unexpected error", error: error.message });
  }
};
