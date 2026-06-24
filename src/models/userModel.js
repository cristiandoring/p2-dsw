const db = require('../config/database');

class UserModel {
  //criar usuário
  static async criarUsuarios(user) {
    const { name, email, password, phone, role } = user;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone, role]
    );
    return result.insertId;
  }

  static async listarUsuarios() {
    // Listar todos usuários
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role FROM users'
    );
    return rows;
  }

  // Listar usuário por id
  static async buscarUsuarioPorId(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // atualizar usuário de um determinado id
  static async atualizarUsuario(id, user) {
    const { name, email, password, phone, role } = user; //
    await db.query(
      'UPDATE users SET name = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?', //
      [name, email, password, phone, role, id] //
    );
    return true;
  }

  //deletar um usuário informando seu id
  static async deletarUsuario(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }

  static async buscarPorEmailComSenha(email) {
    const [rows] = await db.query(
      'SELECT id, name, email, password, phone, role FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
}

module.exports = UserModel;
