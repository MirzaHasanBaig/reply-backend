const express = require("express");
const router = express.Router();

router.post("/create", async (req, res) => { 
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const { name, email, paymentMethod, priceId } = req.body;

    if (!name || !email || !paymentMethod || !priceId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Received request:", req.body);

    // Create Stripe Customer
    const customer = await stripe.customers.create({
      name,
      email,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
    });

    console.log("Customer created:", customer.id);

    // Create Stripe Subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      collection_method: "charge_automatically",
      payment_settings: {
        payment_method_options: {
          card: { },
        },
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice"],
    });

    console.log("Subscription created:", subscription.id);

    const clientSecret = subscription.latest_invoice?.payment_intent?.client_secret || null;

    res.json({
      clientSecret,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
