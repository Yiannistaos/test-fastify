const {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem,
} = require('../controllers/items');

// Item Schema
const Item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
    },
};

// Options for get all items
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item,
            },
        },
    },
    handler: getItems,
};

// Options for get single item
const getItemOpts = {
    schema: {
        response: {
            200: Item,
        },
    },
    handler: getItem,
};

// Options for insert single item
const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            },
        },
        response: {
            201: Item,
        },
    },
    handler: addItem,
};

// Options for delete single item
const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteItem,
};

// Options for update a single item
const updateItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    item: Item,
                },
            },
        },
    },
    handler: updateItem,
};

function itemRoutes(fastify, options, done) {
    // Get All Items

    fastify.get('/items', getItemsOpts);

    // Get Single Item
    fastify.get('/items/:id', getItemOpts);

    // Add Item
    fastify.post('/items', postItemOpts);

    // Delete Item
    fastify.delete('/items/:id', deleteItemOpts);

    // Update Item
    fastify.put('/items/:id', updateItemOpts);

    done();
}

module.exports = itemRoutes;
