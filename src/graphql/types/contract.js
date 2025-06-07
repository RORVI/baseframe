const { gql } = require('apollo-server-express');

module.exports = gql`
  type Contract {
    id: ID!
    terms: String!
    status: String!
    client: Profile
    contractor: Profile
    jobs: [Job]
  }

  extend type Query {
    contracts: [Contract]
    contract(id: ID!): Contract
  }

  extend type Mutation {
    createContract(
        terms: String!
        status: String!
        ClientId: ID!
        ContractorId: ID!
    ): Contract

    updateContract(
        id: ID!
        terms: String
        status: String
        ClientId: ID
        ContractorId: ID
    ): Contract

    deleteContract(id: ID!): Boolean
  }
`;