const bcrypt = require('bcrypt');
/**
 * Users.js holds the records containing the admin.
 * compare and search functions can be found here as well.
 */
const records = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
    name: 'Stjórnandi',
  },
];

exports.comparePasswords = (hash, user) =>
  bcrypt.compare(hash, user.password)
    .then((res) => {
      if (res) {
        return user;
      }
      return false;
    });

exports.findByUsername = username => new Promise((resolve) => {
  const found = records.find(u => u.username === username);

  if (found) {
    return resolve(found);
  }

  return resolve(null);
});

exports.findById = id => new Promise((resolve) => {
  const found = records.find(u => u.id === id);

  if (found) {
    return resolve(found);
  }

  return resolve(null);
});
