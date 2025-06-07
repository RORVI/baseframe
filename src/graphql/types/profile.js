const { gql } = require('graphql-tag');

module.exports = gql`
  type Profile {
    id: ID!
    firstName: String!
    lastName: String!
    profession: String!
    balance: Float
    type: String
    contractsAsClient: [Contract]
    contractsAsContractor: [Contract]
  }

  extend type Query {
    profiles: [Profile]
    profile(id: ID!): Profile
  }

  extend type Mutation {
    createProfile(
      firstName: String!
      lastName: String!
      profession: String!
      type: String!
      balance: Float
    ): Profile

    updateProfile(
        id: ID!
        firstName: String
        lastName: String
        profession: String
        balance: Float
        type: String
    ): Profile

    deleteProfile(id: ID!): Boolean
  }
`;
