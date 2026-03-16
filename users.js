const bcrypt = require('bcryptjs');

// Usuarios del sistema con roles
// Roles: 'admin', 'colaborador', 'visitante' (sin login)
const users = [
  {
    id: 1,
    username: 'admin',
    // Contraseña: admin123
    password: '$2b$10$dRV9mzkJMwbFImRIwoWQEO7WMgBo3WjRrQEuI8YT9oRge2VbV2GCe',
    role: 'admin'
  },
  {
    id: 2,
    username: 'colaborador',
    // Contraseña: colaborador123
    password: '$2b$10$AvPu5SQ7Zum3YiGcphJg0ODJEn8kurBpCLq61hMe.P020Yuni6Pau',
    role: 'colaborador'
  }
];

// Función para verificar contraseña
function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

// Función para encontrar usuario por username
function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

// Función para agregar nuevo usuario (para uso futuro)
function addUser(username, password, role = 'user') {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role
  };
  users.push(newUser);
  return newUser;
}

module.exports = {
  users,
  verifyPassword,
  findUserByUsername,
  addUser
};
