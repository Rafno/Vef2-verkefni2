const express = require('express');
const { Client } = require('pg');
const csv = require('express-csv'); // eslint-disable-line

/**
 * Admin.js holds the admin functions while the admin is logged in.
 * Admin has the ability to view other users as well as download a csv file.
 */
const router = express.Router();

const connectionString = process.env.DATABASE_URL || 'postgres://:@localhost/postgres';
/**
 * Async file get function. Queries the database for all users.
 */
async function getGogn() {
  const client = new Client({ connectionString });
  await client.connect();
  const data = await client.query('SELECT id, date, name, email, ssn, amount FROM users');
  await client.end();
  return data.rows;
}
function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

router.get('/admin', ensureLoggedIn, async (req, res) => {
  const data = await getGogn();
  res.render('admin', {
    data,
  });
});


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/**
* downloads the tables as a csv file.
*/
router.get('/download', ensureLoggedIn, async (req, res) => {
  const data = await getGogn();
  data.unshift(['date', 'name', 'email', 'amount', 'ssn']);
  res.set(
    'Content-Disposition',
    'attachment; filename=\'dataSql.csv\'',
  );
  res.send(res.csv(data));
});

function thanks(req, res) {
  const gogn = {};
  res.render('thanks', {
    gogn,
  });
}
router.get('/thanks', thanks);
module.exports = router;
