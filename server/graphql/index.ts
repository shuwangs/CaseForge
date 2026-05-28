import { ApolloServer } from '@apollo/server';
import type { GraphQLContext } from './context.ts';
import { resolvers } from './resolvers.ts';
import { typeDefs } from './typeDefs.ts';

const server = new ApolloServer<GraphQLContext>({ typeDefs, resolvers });

export default server;
