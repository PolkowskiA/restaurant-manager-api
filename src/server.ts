import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import config from "./app.env";
import { authMiddleware } from "./middlewares/authMiddleware";
import { resolvers } from "./schema/resolvers.generated";
import { typeDefs } from "./schema/typeDefs.generated";

export const startServer = async () => {
  const app = express();

  app.use(
    cors({
      origin: config.LOCAL_CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(express.json());
  app.use(authMiddleware);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  app.listen(config.PORT, () => {
    console.log(`API running on http://localhost:${config.PORT}`);
  });
};
