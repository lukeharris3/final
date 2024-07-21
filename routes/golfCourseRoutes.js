const express = require('express');
const router = express.Router();
const { getAllGolfCourses, getGolfCourseById, createGolfCourse } = require('../controllers/golfCourseController');

router.get('/', getAllGolfCourses);
router.get('/:id', getGolfCourseById);
router.post('/', createGolfCourse);

module.exports = router;
