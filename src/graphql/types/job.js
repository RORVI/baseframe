const { gql } = require('apollo-server-express');

module.exports = gql`
  type Job {
    id: ID!
    description: String!
    price: Float!
    paid: Boolean!
    paymentDate: String
    contract: Contract
  }

  extend type Query {
    jobs: [Job]
    job(id: ID!): Job
  }

  extend type Mutation {
    createJob(
        description: String!
        price: Float!
        paid: Boolean!
        paymentDate: String
        contractId: ID!
    ): Job

     updateJob(
        id: ID!
        description: String
        price: Float
        paid: Boolean
        paymentDate: String
        ContractId: ID
    ): Job

    deleteJob(id: ID!): Boolean
}
`;