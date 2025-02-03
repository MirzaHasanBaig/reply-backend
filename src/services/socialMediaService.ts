const { SocialMediaPost }  = require("../models/SocialMediaPost")
const { logger }  = require("../utils/logger")

export const createSocialMediaPost = async (userId, postData: any) => {
  try {
    const post = new SocialMediaPost({ ...postData, user: userId })
    await post.save()
    logger.info(`Social media post created: ${post.id}`)
    return post
  } catch (error) {
    logger.error(`Error creating social media post: ${error}`)
    throw error
  }
}

export const scheduleSocialMediaPost = async (postId, scheduleDate: Date) => {
  try {
    const post = await SocialMediaPost.findByIdAndUpdate(postId, { scheduledFor: scheduleDate }, { new: true })
    if (!post) throw new Error("Post not found")
    logger.info(`Social media post scheduled: ${postId}`)
    return post
  } catch (error) {
    logger.error(`Error scheduling social media post: ${error}`)
    throw error
  }
}

export const getSocialMediaAnalytics = async (userId, platform) => {
  try {
    const analytics = await SocialMediaPost.aggregate([
      { $match: { user: userId, platform } },
      { $group: { _id: null, totalLikes: { $sum: "$likes" }, totalShares: { $sum: "$shares" } } },
    ])
    return analytics[0] || { totalLikes: 0, totalShares: 0 }
  } catch (error) {
    logger.error(`Error fetching social media analytics: ${error}`)
    throw error
  }
}

