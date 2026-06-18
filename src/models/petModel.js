const db = require('../config/database');

class PetModel {
  //cadastrar pet
  static async criarPet(pet) {
    const { name, age, species, size, status, description } = pet;
    const [result] = await db.query(
      'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, age, species, size, status, description]
    );
    return result.insertId;
  }

  // Lista todos pets
  static async listarPets() {
    const [rows] = await db.query(
      'SELECT id, name, age, species, size, status, description FROM pets'
    );
    return rows;
  }

  // Busca pet por ID
  static async buscarPetPorId(id) {
    const [rows] = await db.query(
      'SELECT id, name, age, species, size, status, description FROM pets WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Atualizar pet de determinado id
  static async atualizarPet(id, pet) {
    const { name, age, species, size, status, description } = pet;
    await db.query(
      'UPDATE pets SET name = ?, age = ?, species = ?, size = ?, status = ?, description = ? WHERE id = ?',
      [name, age, species, size, status, description, id]
    );
    return true;
  }

  // Apagar pet
  static async deletarPet(id) {
    await db.query('DELETE FROM pets WHERE id = ?', [id]);
    return true;
  }
}

module.exports = PetModel;
