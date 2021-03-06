const { ApolloEngineLauncher } = require('apollo-engine');

// Define the Engine configuration.
const launcher = new ApolloEngineLauncher({
  // Enter your API key from step 2 above. You can also provide this
  // in the ENGINE_API_KEY environment variable.
  apiKey: process.env.API_KEY,
  logging: {
    level: process.env.LOG_LEVEL
  },
  origins: [{
    http: {
      // The URL that the Proxy should use to connect to your
      // GraphQL server.
      url: process.env.BACKEND_URL,
      overrideRequestHeaders: {
        Host: process.env.HOST
      }
    },
  }],
  // Tell the Proxy on what port to listen, and which paths should
  // be treated as GraphQL instead of transparently proxied as raw HTTP.
  // You can leave out the frontend section if you want: the default for
  // 'port' is process.env.PORT, and the default for endpoints is
  // ['/graphql'].
  frontends: [{
    port: parseInt(process.env.PORT, 10),
    endpoints: ['/graphql_api'],
    overrideGraphqlResponseHeaders: {
      'Access-Control-Allow-Headers': 'apollographql-client-name, apollographql-client-version'
    }
  }],
});

// Start the Proxy; crash on errors.
launcher.start().catch(err => { throw err; });
