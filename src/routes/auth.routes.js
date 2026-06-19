const express = require('express');
const AuthController = require('../controllers/auth.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/users', AuthController.register);
router.post('/login', AuthController.login);

router.get('/users', authenticateToken, AuthController.listarTodos);
router.get('/users/:id', authenticateToken, AuthController.buscarPorId);

router.put('/users/:id', authenticateToken, AuthController.atualizar);

router.delete('/users/:id', authenticateToken, AuthController.deletar);

module.exports = router;
