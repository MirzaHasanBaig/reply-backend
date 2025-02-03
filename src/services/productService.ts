const { Product }  = require("../models/Product")
const { logger }  = require("../utils/logger")

export const createProduct = async (userId, productData: any) => {
  try {
    const product = new Product({ ...productData, creator: userId })
    await product.save()
    logger.info(`Product created: ${product.id}`)
    return product
  } catch (error) {
    logger.error(`Error creating product: ${error}`)
    throw error
  }
}

export const updateProduct = async (productId, updateData: any) => {
  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true })
    if (!product) throw new Error("Product not found")
    logger.info(`Product updated: ${productId}`)
    return product
  } catch (error) {
    logger.error(`Error updating product: ${error}`)
    throw error
  }
}

export const deleteProduct = async (productId) => {
  try {
    await Product.findByIdAndDelete(productId)
    logger.info(`Product deleted: ${productId}`)
  } catch (error) {
    logger.error(`Error deleting product: ${error}`)
    throw error
  }
}

export const getProducts = async (filters: any = {}) => {
  try {
    const products = await Product.find(filters)
    return products
  } catch (error) {
    logger.error(`Error fetching products: ${error}`)
    throw error
  }
}

