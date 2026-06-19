const UserService = require('../services/userService');

class AuthController {
  static async register(req, res) {
    try {
      const result = await UserService.registrarUsuario(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const result = await UserService.loginUsuario(req.body);
      return res.status(200).json(result);
    } catch (error) {
      const status =
        error.message === 'Usuário não encontrado' ||
        error.message === 'Senha inválida'
          ? 401
          : 500;
      return res.status(status).json({ message: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const usuarios = await UserService.listarTodosUsuarios(req.user);

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const result = await UserService.buscarUsuario(req.params.id, req.user);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const result = await UserService.atualizarDadosUsuario(
        req.params.id,
        req.body,
        req.user
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const result = await UserService.deletarUsuarioSistema(
        req.params.id,
        req.user
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
