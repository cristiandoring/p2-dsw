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
    if (currentUser.role !== 'adopter') {
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

    // 1. Cria o registro na tabela de adoções vinculando o pet ao usuário
    const adocaoId = await AdoptionModel.criarAdocao(pet_id, currentUser.id);

    // 2. Atualiza o status do pet para 'adopted' na tabela de pets
    await PetModel.atualizarPet(pet_id, { status: 'adopted' });

    return { message: 'Adoção realizada com sucesso!', id: adocaoId };
  }
}

module.exports = AdoptionService;
