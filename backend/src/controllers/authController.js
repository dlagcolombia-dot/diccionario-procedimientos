const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/jwt');

class AuthController {
  static login(req, res) {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }
    
    const user = User.findByUsername(username);
    
    if (!user || !User.verifyPassword(password, user.password)) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      mensaje: 'Login exitoso',
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  }

  static verify(req, res) {
    res.json({ user: req.user });
  }
}

module.exports = AuthController;
