const { Asset }  = require("../models/Asset")
const { uploadFile, getFile }  = require("../utils/cloudflareR2")
const { logger }  = require("../utils/logger")
const express  = require("express")

export const uploadAsset = async (userId, file:any, metadata: any) => {
  try {
    const key = `${userId}/${Date.now()}-${file.originalname}`
    await uploadFile("asset-bucket", key, file.buffer)

    const asset = new Asset({
      user: userId,
      key,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      metadata,
    })
    await asset.save()

    logger.info(`Asset uploaded: ${asset.id}`)
    return asset
  } catch (error) {
    logger.error(`Error uploading asset: ${error}`)
    throw error
  }
}

export const getAsset = async (assetId) => {
  try {
    const asset = await Asset.findById(assetId)
    if (!asset) {
      throw new Error("Asset not found")
    }

    const file = await getFile("asset-bucket", asset.key)
    return { metadata: asset, file }
  } catch (error) {
    logger.error(`Error fetching asset: ${error}`)
    throw error
  }
}

// Implement other asset library-related functions (delete asset, update metadata, etc.)

