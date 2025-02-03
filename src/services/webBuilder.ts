const { Website }  = require("../models/Website")

export const createWebsite = async (name, content: any) => {
  const website = new Website({ name, content })
  await website.save()
  return website
}

export const updateWebsite = async (id, name, content: any) => {
  const website = await Website.findByIdAndUpdate(id, { name, content }, { new: true })
  return website
}

export const deleteWebsite = async (id) => {
  await Website.findByIdAndDelete(id)
}

