const PetService = require('../services/petService');

class PublicController {
  static home(req, res) {
    try {
      return res.status(200).json({ message: 'Bem-vindo à API pública!' });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao acessar a rota pública',
        error: error.message,
      });
    }
  }

  static async listarDisponiveis(req, res) {
    try {
      const todosPets = await PetService.listarTodosPets();
      const petsDisponiveis = todosPets.filter(
        (pet) => pet.status === 'available'
      );
      return res.status(200).json(petsDisponiveis);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar pets disponíveis',
        error: error.message,
      });
    }
  }
}

module.exports = PublicController;
