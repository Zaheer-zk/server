import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    gender: String!
    isActive: Boolean
    isVerified: Boolean
    createdAt: String!
    updatedAt: String!
  }
`;
