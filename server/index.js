import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

// import typeDefs from './schema';
// import resolvers from './resolvers';
import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const PORT = 8080;

const apollo = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: {
    models,
  }
});
const app = express();

app.use(cors('*'));

apollo.applyMiddleware({ app });

// const graphqlEndpoint = '/graphql';

// app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));

// app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT);
})