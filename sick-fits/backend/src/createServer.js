const { GraphQLServer } = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutations = require('./resolvers/Mutation')
const db = require('./db')

const createServer = _ => new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers: { Mutations, Query },
  resolverValidationOptions: { requireResolversForResolveType: false },
  context: req => ({ ...req, db })
})

module.exports = createServer
