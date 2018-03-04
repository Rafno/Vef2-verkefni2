const express = require('express');
const { Client } = require('pg');
const passport = require('passport');
const xss = require('xss');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:@localhost/postgres';

/**
 * WriteData writes into the schema while protecting against malicious injections.
 * @param {any} name
 * @param {any} email
 * @param {any} ssn
 * @param {any} amount
 */

async function writeData(name, email, ssn, amount) {

  const client = new Client({ connectionString });
  await client.connect();
  await client.query(
    'INSERT INTO users(name, email, ssn, amount) VALUES ($1, $2, $3, $4);',
    [
      xss(name),
      xss(email),
      xss(ssn),
      xss(amount),
    ],
  );
  await client.end();
}

/**
 * The following routers catch the urls and perform various functions,
 * including calling upon pug files and rendering the site, depending if the admin is logged in or not.
 */

router.get('/', (req, res) => {
  const data = {};
  if (req.isAuthenticated()) {
    return res.render('form', {
      data,
      LoginOut: true,
      leyndarmal: true,
      admin: req.user.name,
    });
  }
  return res.render('form', {
    data,
    LoginOut: false,
    leyndarmal: false,
  });
});

router.get('/login', (req, res) => {
  const data = {};
  res.render('login', { data });
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/admin');
  },
);


function form(req, res) {
  const data = {};
  res.render('form', { data });
}

router.get('/', form);

/**
 * Validates all forms, making sure none are empty or match correct regex.
 * 
 */
router.post(
  '/register',
  // Þetta er bara validation! Ekki sanitization
  check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
  check('email').isLength({ min: 1 }).withMessage('Netfang má ekki vera tómt'),
  check('email').isEmail().withMessage('Netfang verður að vera netfang'),
  check('ssn').isLength({ min: 1 }).withMessage('Kennitala má ekki vera tóm'),
  check('ssn').matches(/^[0-9]{6}-?[0-9]{4}$/).withMessage('Kennitala verður að vera á formi 000000-0000'),
  check('amount').isInt({ min: 1, max: 2147483647 }).withMessage('Amount má ekki vera minna en 1'),

  async (req, res) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      data.err = errors.array().map(i => i.msg);
      return res.render('form', {
        data,
        LoginOut: false,
        leyndarmal: false,
      });
    }
    await writeData(data.name, data.email, data.ssn, data.amount);
    return res.redirect('/thanks');
  } 
);
module.exports = router;
