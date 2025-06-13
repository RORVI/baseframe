const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const resolvers = require('./resolvers'); 
const createProfileLoader = require('../loaders/profileLoader');

const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');

const schemaWithResolvers = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

async function applyApollo(app) {
  const server = new ApolloServer({ schema: schemaWithResolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = applyApollo;
