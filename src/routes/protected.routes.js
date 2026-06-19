const express = require('express');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');
const ProtectedController = require('../controllers/protected.controller');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/dashboard', authenticateToken, ProtectedController.dashboard);
router.get(
  '/admin',
  authenticateToken,
  authorizeRole('admin'),
  ProtectedController.adminOnly
);

router.get(
  '/users',
  authenticateToken,
  authorizeRole('admin'),
  AuthController.listarTodos
);
router.get('/users/:id', authenticateToken, AuthController.buscarPorId);
router.put('/users/:id', authenticateToken, AuthController.atualizar);
router.delete(
  '/users/:id',
  authenticateToken,
  authorizeRole('admin'),
  AuthController.deletar
);

router.get(
  '/pets',
  authenticateToken,
  authorizeRole('admin'),
  ProtectedController.listarTodosPets
);
router.get(
  '/pets/:id',
  authenticateToken,
  authorizeRole('admin'),
  ProtectedController.buscarPetPorId
);
router.post(
  '/pets',
  authenticateToken,
  authorizeRole('admin'),
  ProtectedController.cadastrarPet
);
router.put(
  '/pets/:id',
  authenticateToken,
  authorizeRole('admin'),
  ProtectedController.atualizarPet
);
router.delete(
  '/pets/:id',
  authenticateToken,
  authorizeRole('admin'),
  ProtectedController.deletarPet
);

router.get(
  '/adoptions',
  authenticateToken,
  authorizeRole('admin'),
  ProtectedController.listarAdocoes
);
router.post('/adoptions', authenticateToken, ProtectedController.criarAdocao);

module.exports = router;
