const PetService = require('../services/petService');

class PetController {
  static async listarTodos(req, res) {
    try {
      const pets = await PetService.listarTodosPets(req.user);
      return res.status(200).json(pets);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const pet = await PetService.buscarPetPorId(req.params.id, req.user);
      return res.status(200).json(pet);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async criar(req, res) {
    try {
      const novoPet = await PetService.criarNovoPet(req.body, req.user);
      return res.status(201).json(novoPet);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const result = await PetService.atualizarDadosPet(
        req.params.id,
        req.body,
        req.user
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const result = await PetService.deletarPetSistema(
        req.params.id,
        req.user
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }
}

module.exports = PetController;
