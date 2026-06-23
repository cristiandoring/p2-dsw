const AdoptionService = require('../services/adoptionService');

class AdoptionController {
  static async listarTodas(req, res) {
    try {
      const adocoes = await AdoptionService.listarTodasAdocoes(req.user);

      if (!adocoes || adocoes.length === 0) {
        return res
          .status(404)
          .json({ message: 'Ainda não tem adoções cadastradas' });
      }

      return res.status(200).json(adocoes);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async criar(req, res) {
    try {
      const novaAdocao = await AdoptionService.realizarAdocao(
        req.body,
        req.user
      );
      return res.status(201).json(novaAdocao);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }
}

module.exports = AdoptionController;
