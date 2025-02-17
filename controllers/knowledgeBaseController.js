const KnowledgeBaseService = require ("../services/knowledgeBaseService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = KnowledgeBaseController = {
  async createArticle(req, res) {
    try {
      const article = await KnowledgeBaseService.createArticle(req.body, req.user.id)
      res.status(201).json(article)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getArticle(req, res) {
    try {
      const article = await KnowledgeBaseService.getArticle(req.params.id)
      res.status(200).json(article)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateArticle(req, res) {
    try {
      const article = await KnowledgeBaseService.updateArticle(req.params.id, req.body)
      res.status(200).json(article)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteArticle(req, res) {
    try {
      await KnowledgeBaseService.deleteArticle(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listArticles(req, res) {
    try {
      const articles = await KnowledgeBaseService.listArticles(req.query)
      res.status(200).json(articles)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async searchArticles(req, res) {
    try {
      const results = await KnowledgeBaseService.searchArticles(req.query.q)
      res.status(200).json(results)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async createCategory(req, res) {
    try {
      const category = await KnowledgeBaseService.createCategory(req.body)
      res.status(201).json(category)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateCategory(req, res) {
    try {
      const category = await KnowledgeBaseService.updateCategory(req.params.id, req.body)
      res.status(200).json(category)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteCategory(req, res) {
    try {
      await KnowledgeBaseService.deleteCategory(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listCategories(req, res) {
    try {
      const categories = await KnowledgeBaseService.listCategories()
      res.status(200).json(categories)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

