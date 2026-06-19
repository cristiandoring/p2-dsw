const PetModel = require('../models/petModel');

class PetService {
  static async criarNovoPet(pet, currentUser) {
    if (currentUser.role !== 'admin') {
      throw new Error(
        'Acesso negado. Apenas administradores podem cadastrar pets.'
      );
    }

    const statusPermitidos = ['available', 'adopted'];
    if (pet.status && !statusPermitidos.includes(pet.status)) {
      throw new Error('Status inválido. Escolha entre available ou adopted.');
    }

    if (!pet.status) {
      pet.status = 'available';
    }

    const id = await PetModel.criarPet(pet);
    return { message: 'Pet cadastrado com sucesso', id };
  }

  static async listarTodosPets() {
    return await PetModel.listarPets();
  }

  static async buscarPetPorId(id) {
    const pet = await PetModel.buscarPetPorId(id);
    if (!pet) {
      throw new Error('Pet não encontrado');
    }
    return pet;
  }

  static async atualizarDadosPet(id, dadosAtualizados, currentUser) {
    if (currentUser.role !== 'admin') {
      throw new Error(
        'Acesso negado. Apenas administradores podem editar pets.'
      );
    }

    const statusPermitidos = ['available', 'adopted'];
    if (
      dadosAtualizados.status &&
      !statusPermitidos.includes(dadosAtualizados.status)
    ) {
      throw new Error('Status inválido. Escolha entre available ou adopted.');
    }

    const petExistente = await PetModel.buscarPetPorId(id);
    if (!petExistente) {
      throw new Error('Pet não encontrado para atualização');
    }

    if (petExistente.status === 'adopted') {
      throw new Error('Pets já adotados não podem ser editados.');
    }

    await PetModel.atualizarPet(id, dadosAtualizados);
    return { message: 'Pet atualizado com sucesso' };
  }

  static async deletarPetSistema(id, currentUser) {
    if (currentUser.role !== 'admin') {
      throw new Error(
        'Acesso negado. Apenas administradores podem remover pets.'
      );
    }

    const petExistente = await PetModel.buscarPetPorId(id);
    if (!petExistente) {
      throw new Error('Pet não encontrado para exclusão');
    }

    if (petExistente.status === 'adopted') {
      throw new Error('Pets já adotados não podem ser removidos do sistema.');
    }

    await PetModel.deletarPet(id);
    return { message: 'Pet deletado com sucesso' };
  }
}

module.exports = PetService;
