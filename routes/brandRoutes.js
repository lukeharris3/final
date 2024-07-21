const express = require('express');
const router = express.Router();
const { getAllBrands, getBrandById, createBrand } = require('../controllers/brandController');

router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.post('/', createBrand);

module.exports = router;
