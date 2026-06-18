const db = require('../config/database');

class AdoptionModel {
  // criar adoção
  static async criarAdocao(adoption) {
    const { user_id, pet_id, adoption_date } = adoption;
    const [result] = await db.query(
      'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)',
      [user_id, pet_id, adoption_date]
    );
    return result.insertId;
  }

  // Listar todas as adoções
  static async listarAdocoes() {
    const [rows] = await db.query(
      'SELECT id, user_id, pet_id, adoption_date FROM adoptions'
    );
    return rows;
  }
}

module.exports = AdoptionModel;
