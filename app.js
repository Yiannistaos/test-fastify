'use strict';

const path = require('path');
const autoload = require('@fastify/autoload');

module.exports = async function (fastify, opts) {
    // Place here your custom code!

    fastify.register(require('@fastify/swagger'), {
        exposeRoute: true,
        routePrefix: '/docs',
    });

    fastify.register(require('fastify-mysql'), {
        // connectionString: 'mysql://root:root@127.0.0.1:8889/fastifydb',
        connectionString: `${process.env.DB_CONNECTION}://${
            process.env.DB_USERNAME
        }:${process.env.DB_PASSWORD}@${process.env.DB_HOST}${
            process.env.DB_PORT ? `:${process.env.DB_PORT}` : ``
        }/${process.env.DB_DATABASE}?synchronize=true`,
    });

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(autoload, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts),
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(autoload, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts),
    });
};
