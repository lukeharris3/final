const pool = require('../db');

const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createOrder = async (req, res) => {
    const { user_id, product_id, quantity, total_price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, product_id, quantity, total_price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
};
