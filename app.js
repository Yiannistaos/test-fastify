'use strict';

const path = require('path');
const autoload = require('@fastify/autoload');

module.exports = async function (fastify, opts) {
    // Place here your custom code!

    fastify.register(require('@fastify/swagger'), {
        exposeRoute: true,
        routePrefix: '/docs',
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
