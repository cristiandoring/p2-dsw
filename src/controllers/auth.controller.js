const UserService = require('../services/userService');

class AuthController {
  
  static async register(req, res) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
      }

      const result = await UserService.registrarUsuario(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
      }

      const result = await UserService.loginUsuario({ email, password });
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
}

module.exports = AuthController;