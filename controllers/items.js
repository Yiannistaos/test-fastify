const { v4: uuidv4 } = require('uuid');
let items = require('../Items');

// Get All Items
const getItems = (req, reply) => {
    reply.send(items);
};

// Get A Single Item
const getItem = (req, reply) => {
    const { id } = req.params;
    const item = items.find((item) => item.id === id);
    reply.send(item);
};

// Add An Item
const addItem = (req, reply) => {
    const { name } = req.body;
    const item = {
        id: uuidv4(),
        name,
    };

    items = [...items, item];

    reply.code(201).send(item);
};

// Delete An Item
const deleteItem = (req, reply) => {
    const { id } = req.params;

    if (items.find((item) => item.id === id)) {
        items = items.filter((item) => item.id !== id);
        reply.code(201).send({ message: `Item ${id} has been removed` });
    }

    reply
        .code(404)
        .send({ message: `Item ${id} does not exists in the list.` });
};

// Update An Item
const updateItem = (req, reply) => {
    const { id } = req.params;
    const { name } = req.body;

    items = items.map((item) => (item.id === id ? { id, name } : item));

    item = items.find((item) => item.id === id);

    reply.send({ status: 'updated', item: item });
};

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem,
};
