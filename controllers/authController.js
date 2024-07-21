const pool = require('../db');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Invalid username or password' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, password, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    login,
    register
};
