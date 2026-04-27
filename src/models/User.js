const bcrypt = require('bcryptjs');

// Usuarios del sistema con roles
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2b$10$dRV9mzkJMwbFImRIwoWQEO7WMgBo3WjRrQEuI8YT9oRge2VbV2GCe',
    role: 'admin'
  },
  {
    id: 2,
    username: 'colaborador',
    password: '$2b$10$AvPu5SQ7Zum3YiGcphJg0ODJEn8kurBpCLq61hMe.P020Yuni6Pau',
    role: 'colaborador'
  }
];

class User {
  static findByUsername(username) {
    return users.find(u => u.username === username);
  }

  static verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  static add(username, password, role = 'user') {
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
}

module.exports = User;
