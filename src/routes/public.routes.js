const express = require('express');
const PetController = require('../controllers/pets.controller');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/pets/available', PetController.listarDisponiveis);
router.post('/users', AuthController.register);

module.exports = router;
