const PetService = require('../services/petService');
const AdoptionService = require('../services/adoptionService');

class ProtectedController {
  static dashboard(req, res) {
    try {
      return res
        .status(200)
        .json({ message: `Bem-vindo ao painel, ${req.user.email}` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao acessar o painel', error: error.message });
    }
  }

  static adminOnly(req, res) {
    try {
      return res
        .status(200)
        .json({ message: `Bem-vindo à área admin, ${req.user.email}` });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao acessar a área admin',
        error: error.message,
      });
    }
  }

  static async listarTodosPets(req, res) {
    try {
      const result = await PetService.listarTodosPets();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async buscarPetPorId(req, res) {
    try {
      const result = await PetService.buscarPet(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async cadastrarPet(req, res) {
    try {
      const result = await PetService.registrarPet(req.body, req.user);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async atualizarPet(req, res) {
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

  static async deletarPet(req, res) {
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

  static async listarAdocoes(req, res) {
    try {
      const result = await AdoptionService.listarAdocoes();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async criarAdocao(req, res) {
    try {
      const result = await AdoptionService.criarAdocao(req.body, req.user);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ProtectedController;
