import 'reflect-metadata';
import { createGraphQLSchema } from './graphql';
import { createConnection } from 'typeorm';
import { Todo } from './graphql/entities/todo';
import fastify = require('fastify');

require('dotenv').config({ path: require('find-config')('.env') });

async function main() {
    await createConnection({
        type: 'sqlite',
        database: './database/db.sqlite',
        entities: [Todo],
        logging: true,
        synchronize: true,
    });

    const schema = await createGraphQLSchema();

    const app = fastify({
        logger: 'debug',
    });

    app.register(require('fastify-cors'), {
        origin: 'http://localhost:3001',
    });

    app.register(require('fastify-gql'), {
        schema,
        routes: true,
        graphiql: true,
        errorHandler: (err, req, res) => {
            res.status(400).send(err);
            console.error(err);
        },
        jit: 1,
    });

    app.listen(process.env.SERVER_PORT || '4000').then(() => console.log('App listen on port ' + process.env.SERVER_PORT));
}

main().then(() => {});
