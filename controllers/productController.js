const ProductService = require ("../services/productService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = ProductController = {
  async createProduct(req, res) {
    try {
      const product = await ProductService.createProduct(req.body, req.user.id)
      res.status(201).json(product)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getProduct(req, res) {
    try {
      const product = await ProductService.getProduct(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateProduct(req, res) {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body)
      res.status(200).json(product)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listProducts(req, res) {
    try {
      const products = await ProductService.listProducts(req.user.id, req.query)
      res.status(200).json(products)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateInventory(req, res) {
    try {
      const product = await ProductService.updateInventory(req.params.id, req.body.quantity)
      res.status(200).json(product)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

