const { v4: uuidv4 } = require('uuid');

// Get All Items
const getItems = (req, reply) => {
    req.server.mysql.query(
        'SELECT id, name FROM items',
        function onResult(err, result) {
            reply.send(err || result);
        }
    );
};

// Get A Single Item
const getItem = (req, reply) => {
    const { id } = req.params;

    req.server.mysql.query(
        'SELECT id, name FROM items WHERE id=?',
        [id],
        function onResult(err, result) {
            if (err) throw err;
            reply.send(result[0]);
        }
    );
};

// Add An Item
const addItem = (req, reply) => {
    const { name } = req.body;
    const item = {
        id: uuidv4(),
        name,
    };

    req.server.mysql.query(
        'insert into items set ?',
        item,
        (err, results, fields) => {
            if (err) throw err;
            console.log('user data inserted successfully');
        }
    );

    reply.code(201).send(item);
};

// Delete An Item
const deleteItem = (req, reply) => {
    const { id } = req.params;

    req.server.mysql.query(
        'DELETE FROM items WHERE id=?',
        [id],
        function onResult(err, result) {
            if (err) throw err;
            if (result.affectedRows) {
                reply
                    .code(201)
                    .send({ message: `Item ${id} has been removed` });
            } else {
                reply.code(404).send({
                    message: `Item ${id} does not exists in the list.`,
                });
            }
        }
    );
};

// Update An Item
const updateItem = (req, reply) => {
    const { id } = req.params;
    const { name } = req.body;

    req.server.mysql.query(
        'UPDATE items SET name=? WHERE id=?',
        [name, id],
        (err, results, fields) => {
            if (err) throw err;
            console.log('user data updated successfully');
        }
    );

    req.server.mysql.query(
        'SELECT id, name FROM items WHERE id=?',
        [id],
        function onResult(err, result) {
            if (err) throw err;
            if (result.length > 0) {
                reply.send({ status: 'updated', item: result[0] });
            }
        }
    );
};

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem,
};
