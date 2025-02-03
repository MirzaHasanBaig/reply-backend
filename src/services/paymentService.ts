const Stripe  = require("stripe")
const { logger }  = require("../utils/logger")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY , { apiVersion: "2023-08-16" })

export const createSubscription = async (userId, planId) => {
  try {
    const customer = await stripe.customers.create({ metadata: { userId } })
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: planId }],
    })
    logger.info(`Subscription created for user: ${userId}`)
    return subscription
  } catch (error) {
    logger.error(`Error creating subscription: ${error}`)
    throw error
  }
}

export const cancelSubscription = async (subscriptionId) => {
  try {
    const canceledSubscription = await stripe.subscriptions.del(subscriptionId)
    logger.info(`Subscription canceled: ${subscriptionId}`)
    return canceledSubscription
  } catch (error) {
    logger.error(`Error canceling subscription: ${error}`)
    throw error
  }
}

export const createPaymentIntent = async (amount: number, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    })
    logger.info(`Payment intent created: ${paymentIntent.id}`)
    return paymentIntent
  } catch (error) {
    logger.error(`Error creating payment intent: ${error}`)
    throw error
  }
}

export const processPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId)
    logger.info(`Payment processed: ${paymentIntentId}`)
    return paymentIntent
  } catch (error) {
    logger.error(`Error processing payment: ${error}`)
    throw error
  }
}

