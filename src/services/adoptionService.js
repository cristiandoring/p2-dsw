const AdoptionModel = require('../models/AdoptionModel');
const PetModel = require('../models/PetModel');

class AdoptionService {
  static async criarAdocao(adoptionData, currentUser) {
    if (currentUser.role !== 'adopter') {
      throw new Error(
        'Acesso negado. Apenas adotantes podem realizar uma adoção.'
      );
    }

    const { pet_id, adoption_date } = adoptionData;
    const user_id = currentUser.userId;

    const pet = await PetModel.buscarPetPorId(pet_id);
    if (!pet) {
      throw new Error('Pet não encontrado.');
    }

    if (pet.status !== 'available') {
      throw new Error('Este pet não está disponível para adoção.');
    }

    const adocoesExistentes = await AdoptionModel.listarAdocoes();
    const jaAdotou = adocoesExistentes.some(
      (a) => a.user_id === user_id && a.pet_id === Number(pet_id)
    );
    if (jaAdotou) {
      throw new Error(
        'Você já enviou uma solicitação ou adotou este pet anteriormente.'
      );
    }

    const dataAdocao = adoption_date || new Date().toISOString().slice(0, 10);

    const newAdoptionId = await AdoptionModel.criarAdocao({
      user_id,
      pet_id,
      adoption_date: dataAdocao,
    });

    await PetModel.atualizarPet(pet_id, { status: 'adopted' });

    return {
      id: newAdoptionId,
      message: 'Adoção realizada com sucesso!',
      pet_id,
    };
  }

  static async listarAdocoes() {
    const adocoes = await AdoptionModel.listarAdocoes();
    if (adocoes.length === 0) {
      return { message: 'Nenhuma adoção encontrada.', data: [] };
    }
    return adocoes;
  }
}

module.exports = AdoptionService;
