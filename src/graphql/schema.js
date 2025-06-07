const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// Load type definitions
const baseTypeDefs = require('./types/base');
const profileTypeDefs = require('./types/profile');
const contractTypeDefs = require('./types/contract');
const jobTypeDefs = require('./types/job');

// Load resolvers
const profileResolvers = require('./resolvers/profile');
const contractResolvers = require('./resolvers/contract');
const jobResolvers = require('./resolvers/job');

// Merge all typedefs & resolvers
const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  profileTypeDefs,
  contractTypeDefs,
  jobTypeDefs,
]);

const resolvers = mergeResolvers([
  profileResolvers,
  contractResolvers,
  jobResolvers,
]);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
