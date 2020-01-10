import next from 'next';
import express from 'express';
import proxy from 'http-proxy-middleware';

require('dotenv').config({ path: require('find-config')('.env') });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('*', (req, res) => {
        handle(req, res).then(() => {});
    });

    server.use('/graphql', proxy({
        target: `http://localhost:${process.env.SERVER_PORT || '4000'}`,
        changeOrigin: true,
        logLevel: 'debug',
    }));

    server.listen(process.env.CLIENT_PORT, () => {
        console.log(`Server started on port ${process.env.CLIENT_PORT || '3000'}`);
    });
});
