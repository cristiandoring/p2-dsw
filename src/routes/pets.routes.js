const express = require('express');
const PetController = require('../controllers/pets.controller');const { authenticateToken } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', authenticateToken, PetController.listarTodos);
router.get('/:id', authenticateToken, PetController.buscarPorId);
router.post('/', authenticateToken, PetController.criar);
router.put('/:id', authenticateToken, PetController.atualizar);
router.delete('/:id', authenticateToken, PetController.deletar);

module.exports = router;
