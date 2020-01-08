import {createGraphQLSchema} from "../graphql";
const Fastify = require("fastify");
const GQL = require("fastify-gql");

export const log = console.log;

const schema = createGraphQLSchema();

const app = Fastify();

app.register(GQL, {
    schema,
    routes: true,
    graphiql: true,
    jit: 1,
});

app.listen(4000).then(() => log('App listen on port 4000'));
