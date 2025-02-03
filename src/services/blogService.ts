const { Blog }  = require("../models/Blog")
const { logger }  = require("../utils/logger")

export const createBlog = async (userId, blogData: any) => {
  try {
    const blog = new Blog({ ...blogData, author: userId })
    await blog.save()
    logger.info(`Blog created: ${blog.id}`)
    return blog
  } catch (error) {
    logger.error(`Error creating blog: ${error}`)
    throw error
  }
}

export const updateBlog = async (blogId, updateData: any) => {
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true })
    if (!blog) throw new Error("Blog not found")
    logger.info(`Blog updated: ${blogId}`)
    return blog
  } catch (error) {
    logger.error(`Error updating blog: ${error}`)
    throw error
  }
}

export const deleteBlog = async (blogId) => {
  try {
    await Blog.findByIdAndDelete(blogId)
    logger.info(`Blog deleted: ${blogId}`)
  } catch (error) {
    logger.error(`Error deleting blog: ${error}`)
    throw error
  }
}

export const getBlogs = async (filters: any = {}) => {
  try {
    const blogs = await Blog.find(filters).sort("-createdAt")
    return blogs
  } catch (error) {
    logger.error(`Error fetching blogs: ${error}`)
    throw error
  }
}

