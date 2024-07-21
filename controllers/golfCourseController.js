const pool = require('../db');

const getAllGolfCourses = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM golfcourses');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getGolfCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM golfcourses WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Golf course not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createGolfCourse = async (req, res) => {
    const { name, address, phone, description, price_for_9, price_for_18, image_url } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO golfcourses (name, address, phone, description, price_for_9, price_for_18, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, address, phone, description, price_for_9, price_for_18, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllGolfCourses,
    getGolfCourseById,
    createGolfCourse
};
