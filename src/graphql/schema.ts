const { gql }  = require("apollo-server-express")

export const typeDefs = gql`
  type User {
    id: ID!
    name!
    email!
    role!
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name!, email!, password!): User
  }
`

