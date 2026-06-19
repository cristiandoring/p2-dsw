const express = require('express');
const PublicController = require('../controllers/public.controller');
const router = express.Router();

router.get('/home', PublicController.home);
router.get('/pets/available', PublicController.listarDisponiveis);

module.exports = router;