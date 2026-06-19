const express = require('express');
const AdoptionController = require('../controllers/adoptions.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', authenticateToken, AdoptionController.listarTodas);
router.post('/', authenticateToken, AdoptionController.criar);

module.exports = router;