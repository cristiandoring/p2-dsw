const UserService = require('../services/userService');

class UserController {
  static async listarTodos(req, res) {
    try {
      const usuarios = await UserService.listarTodosUsuarios(req.user);

      if (!usuarios || usuarios.length === 0) {
        return res
          .status(404)
          .json({ message: 'Ainda não tem usuários cadastrados' });
      }

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const result = await UserService.buscarUsuario(req.params.id, req.user);

      if (!result) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

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

module.exports = UserController;
