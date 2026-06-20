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
router.get(
  '/users/:id',
  authenticateToken,
  authorizeRole('admin'),
  AuthController.buscarPorId
);
router.put(
  '/users/:id',
  authenticateToken,
  authorizeRole('admin'),
  AuthController.atualizar
);
router.delete(
  '/users/:id',
  authenticateToken,
  authorizeRole('admin'),
  AuthController.deletar
);

module.exports = router;
