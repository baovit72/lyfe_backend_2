/**
 * third party libraries
 */
const JWTService = require("./services/auth.service");

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const helmet = require("helmet");
const http = require("http");
const mapRoutes = require("express-routes-mapper");
const { PubSub } = require("apollo-server-express");
const { uploadImageMW, uploadVideoMW, embedVideo, embedImage } =
  require("./controllers/MediaController")();
const { PeerServer } = require("peer");

const peerServer = PeerServer({ port: 20212, path: "/room" });

/**
 * server configuration
 */
const config = require("../config/");
const auth = require("./policies/auth.policy");
const dbService = require("./services/db.service");
const { schema } = require("./graphql");

// environment: development, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const api = express();
const server = http.Server(api);
const privateMappedRoutes = mapRoutes(config.privateRoutes, "api/controllers/");
const publicMappedRoutes = mapRoutes(config.publicRoutes, "api/controllers/");
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
api.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
);

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// public REST API
api.use("/rest", publicMappedRoutes);

// private REST API
api.use("/rest", privateMappedRoutes);

// private GraphQL API
const mediaEmbedMws = [uploadImageMW, embedImage, uploadVideoMW, embedVideo];
api.post("/graphql", (req, res, next) => auth(req, res, next));

const pubsub = new PubSub();
const graphQLServer = new ApolloServer({
  schema,
  subscriptions: {
    path: "/subscriptions",
    onConnect: (connectionParams, websocket, context) => {
      console.log("Client connected for subscriptions");
    },
    onDisconnect: () => {
      console.log("Client disconnected from subscriptions");
    },
  },
  context: ({ req, connection }) => {
    let authorization;
    if (connection) {
      authorization = connection.variables.token;
    } else authorization = req.header("Authorization");
    let tokenToVerify;
    if (authorization) {
      const parts = authorization.split(" ");
      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];
        if (/^Bearer$/.test(scheme)) {
          tokenToVerify = credentials;
        } else {
          throw new Error("Wrong token format");
        }
      } else {
        throw new Error("Wrong token format");
      }
    } else {
      throw new Error("No token found");
    }
    return JWTService().verify(tokenToVerify, (err, thisToken) => {
      if (err) throw new Error("Unvalid token");
      return { userId: thisToken.id, pubsub };
    });
  },
});

graphQLServer.applyMiddleware({
  app: api,
  cors: {
    origin: true,
    credentials: true,
    methods: ["POST"],
    allowedHeaders: [
      "X-Requested-With",
      "X-HTTP-Method-Override",
      "Content-Type",
      "Accept",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  },
  playground: {
    settings: {
      "editor.theme": "light",
    },
  },
});

graphQLServer.installSubscriptionHandlers(server);
server.listen(config.port, () => {
  if (
    environment !== "production" &&
    environment !== "development" &&
    environment !== "testing"
  ) {
    console.error(
      `NODE_ENV is set to ${environment}, but only production and development are valid.`
    );
    process.exit(1);
  }
  console.log(
    `Server ready at http://localhost:${config.port}${graphQLServer.graphqlPath}`
  );
  console.log(
    `Subscriptions ready at ws://localhost:${config.port}${graphQLServer.subscriptionsPath}`
  );
  return DB;
});

//Seed DB
const { exec } = require("child_process");
const seed = exec("yarn seed", { env: process.env });

// Forward stdout+stderr to this process
seed.stdout.pipe(process.stdout);
seed.stderr.pipe(process.stderr);
