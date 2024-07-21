const pool = require('../db');

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createProduct = async (req, res) => {
    const { brand_id, name, category, price, description, image_url } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (brand_id, name, category, price, description, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [brand_id, name, category, price, description, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
};
