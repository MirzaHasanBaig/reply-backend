const Product = require ("../models/product.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = ProductService = {
  async createProduct(productData, userId) {
    const product = new Product({
      ...productData,
      createdBy: userId,
    });
    await product.save();
    return product;
  },

  async getProduct(productId) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  },

  async updateProduct(productId, updateData) {
    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  },

  async deleteProduct(productId) {
    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      throw new NotFoundError('Product not found');
    }
  },

  async listProducts(userId, query) {
    const { page = 1, limit = 10, category, status } = query;
    const filter = { createdBy: userId };

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    return {
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

}