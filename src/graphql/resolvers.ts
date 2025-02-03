const { User }  = require("../models/User")

export const resolvers = {
  Query: {
    getUser: async (_: any, { id }: { id }) => {
      return await User.findById(id)
    },
  },
  Mutation: {
    createUser: async (_: any, { name, email, password }: { name; email; password }) => {
      const user = new User({ name, email, password })
      await user.save()
      return user
    },
  },
}

