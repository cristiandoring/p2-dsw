const express = require('express');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');

const UserController = require('../controllers/users.controller');
const PetController = require('../controllers/pets.controller');
const AdoptionController = require('../controllers/adoptions.controller');

const router = express.Router();

router.use(authenticateToken);

router.get('/users', authorizeRole('admin'), UserController.listarTodos);
router.get('/users/:id', UserController.buscarPorId);
router.put('/users/:id', UserController.atualizar);
router.delete('/users/:id', authorizeRole('admin'), UserController.deletar);

router.get('/pets', authorizeRole('admin'), PetController.listarTodos);
router.get('/pets/:id', authorizeRole('admin'), PetController.buscarPorId);
router.post('/pets', authorizeRole('admin'), PetController.criar);
router.put('/pets/:id', authorizeRole('admin'), PetController.atualizar);
router.delete('/pets/:id', authorizeRole('admin'), PetController.deletar);

router.get(
  '/adoptions',
  authorizeRole('admin'),
  AdoptionController.listarTodas
);
router.post('/adoptions', authorizeRole('adopter'), AdoptionController.criar);

module.exports = router;
