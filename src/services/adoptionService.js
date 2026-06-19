const AdoptionModel = require('../models/adoptionModel');
const PetModel = require('../models/petModel');

class AdoptionService {
  static async listarTodasAdocoes(currentUser) {
    if (currentUser.role !== 'admin') {
      throw new Error(
        'Acesso negado. Apenas administradores podem listar todas as adoções.'
      );
    }
    return await AdoptionModel.listarAdocoes();
  }

  static async realizarAdocao(dados, currentUser) {
    const role =
      currentUser.role || (currentUser.user && currentUser.user.role);

    if (role !== 'adopter') {
      throw new Error(
        'Acesso negado. Apenas adotantes podem realizar uma adoção.'
      );
    }

    const { pet_id } = dados;
    if (!pet_id) {
      throw new Error('O ID do pet é obrigatório para realizar a adoção.');
    }

    const pet = await PetModel.buscarPetPorId(pet_id);
    if (!pet) {
      throw new Error('Pet não encontrado.');
    }

    if (pet.status === 'adopted') {
      throw new Error('Este pet já foi adotado.');
    }

    const usuarioId =
      currentUser.userId ||
      currentUser.id ||
      (currentUser.user && currentUser.user.userId) ||
      (currentUser.user && currentUser.user.id);

    if (!usuarioId) {
      throw new Error('Não foi possível identificar o ID do usuário no token.');
    }

    const objetoAdocao = {
      user_id: usuarioId,
      pet_id: pet_id,
      adoption_date: new Date(),
    };

    const adocaoId = await AdoptionModel.criarAdocao(objetoAdocao);

    const dadosAtualizacaoPet = {
      ...pet,
      status: 'adopted',
    };

    await PetModel.atualizarPet(pet_id, dadosAtualizacaoPet);

    return { message: 'Adoção realizada com sucesso!', id: adocaoId };
  }
}

module.exports = AdoptionService;
