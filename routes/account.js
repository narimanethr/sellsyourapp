const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentification.middleware');

// import controller for index
const sellerController = require('../controllers/seller.controller');

router.get('/', sellerController.home );

module.exports = router;
