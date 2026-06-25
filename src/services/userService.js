const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class UserService {
  static async registrarUsuario(user) {
    const usuarios = await UserModel.listarUsuarios();
    const emailExistente = usuarios.find((u) => u.email === user.email);

    if (emailExistente) {
      throw new Error('Já existe um usuário com esse e-mail');
    }

    if (!user.role) {
      user.role = 'adopter';
    }

    const hashed = await bcrypt.hash(user.password, 10);
    user.password = hashed;

    const id = await UserModel.criarUsuarios(user);
    return { message: 'Usuário registrado com sucesso', id };
  }

  static async loginUsuario({ email, password }) {
    const user = await UserModel.buscarPorEmailComSenha(email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      message: 'Login realizado com sucesso',
      token,
    };
  }

  static async listarTodosUsuarios(currentUser) {
    if (currentUser.role !== 'admin') {
      throw new Error('Acesso negado. Apenas administradores.');
    }

    const usuarios = await UserModel.listarUsuarios();
    return usuarios.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );
  }
  static async buscarUsuario(id, currentUser) {
    if (currentUser.role !== 'admin' && currentUser.userId !== Number(id)) {
      throw new Error(
        'Acesso negado. Você não tem permissão para ver este perfil.'
      );
    }

    const usuario = await UserModel.buscarUsuarioPorId(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const { password, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  static async atualizarDadosUsuario(id, dadosAtualizados, currentUser) {
    if (currentUser.role !== 'admin' && currentUser.userId !== Number(id)) {
      throw new Error(
        'Acesso negado. Você não tem permissão para editar este perfil.'
      );
    }

    const usuarioExistente = await UserModel.buscarUsuarioPorId(id);
    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado para atualização');
    }

    if (
      dadosAtualizados.email &&
      dadosAtualizados.email !== usuarioExistente.email
    ) {
      const usuarios = await UserModel.listarUsuarios();
      const emailEmUso = usuarios.find(
        (u) => u.email === dadosAtualizados.email && u.id !== Number(id)
      );
      if (emailEmUso) {
        throw new Error('Já existe um usuário com esse e-mail');
      }
    }

    if (dadosAtualizados.password) {
      dadosAtualizados.password = await bcrypt.hash(
        dadosAtualizados.password,
        10
      );
    }

    await UserModel.atualizarUsuario(id, dadosAtualizados);
    return { message: 'Usuário atualizado com sucesso' };
  }

  static async deletarUsuarioSistema(id, currentUser) {
    if (currentUser.role !== 'admin') {
      throw new Error(
        'Acesso negado. Apenas administradores podem remover usuários.'
      );
    }

    const usuarioExistente = await UserModel.buscarUsuarioPorId(id);
    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado para exclusão');
    }

    await UserModel.deletarUsuario(id);
    return { message: 'Usuário deletado com sucesso' };
  }
}

module.exports = UserService;
