const pool = require('../db');

const getAllBrands = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM brands');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching brands:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBrandById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM brands WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching brand by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createBrand = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO brands (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating brand:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand
};
