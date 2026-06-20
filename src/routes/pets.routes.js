const express = require('express');
const PetController = require('../controllers/pets.controller');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');
const router = express.Router();

router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.listarTodos
);
router.get('/:id', authenticateToken, PetController.buscarPorId);
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.criar
);
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.atualizar
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.deletar
);

module.exports = router;
