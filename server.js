const fastify = require('fastify')({ logger: true });
fastify.register(require('@fastify/swagger'), {});
fastify.register(require('@fastify/swagger-ui'), {
    exposeRoute: true,
    routePrefix: '/docs',
});

fastify.register(require('./routes/items'));

const PORT = 5500;

// Homepage
fastify.get('/', (req, reply) => {
    reply.send({ homePageTitle: 'HelloWorld' });
});

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start();
