const pool = require('../db');

const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    const { first_name, last_name, email, address, username, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, email, address, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, email, address, username, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser
};
