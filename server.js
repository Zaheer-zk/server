import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import adminUserRouter from './routers/adminUserRouter.js';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRouter);
app.use('/api', adminUserRouter);

dotenv.config({
  path: './env',
});

connectDB();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });
  await server.start();
  server.applyMiddleware({ app });

  console.log(`
    🚀  Server is running!
    📭  GraphQL Playground available at http://localhost:${process.env.PORT}/graphql
  `);
}

startApolloServer();

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
