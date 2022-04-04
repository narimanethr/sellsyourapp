const bcrypt = require('bcrypt');
const Seller = require('../models/sellers.model').model;

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const registerForm = (_,res) => res.redirect('/register.html');

const register = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  console.log(`register , body.admin : ${req.body.admin}`);

  try {
    const sellerData = {
                        ...req.body,
                        password: hashPassword   // replace password by crypted version
                     };
    const newSeller = await Seller.create(sellerData); // save seller in the database
    delete sellerData.password;                    // password is not sent back in request
    console.log('utilisateur créé');
    res.status(201).json(sellerData);
  }
  catch (err){
    console.log(`pb création utilisateur ${err.message}`);
    res.status(409).json({ message : err.message });
  }
}

/*
* fournit en résultat une vue qui gère le formulaire d'identification
*/
const loginForm = (_,res) => res.redirect('/login.html');
/*
* cherche s'il existe un utilisateur correspondant aux identifiants/mot de passe fournis
* si c'est le cas un jeton JWT est créé et renvoyé
*/
const login = async (req, res) => {
  try {
    // check if seller exist
    const seller = await Seller.findOne( { login : req.body.login });

    if (seller) {
      // check password
      const validPassword = await bcrypt.compare(req.body.password, seller.password);

      if (!validPassword) // wrong password
        return res.status(401).json({ message : 'mot de passe incorrect.'});

      // create and send token
      const token = jwt.sign({id: seller._id}, jwtConfig.SECRET_TOKEN, {expiresIn : '60s'} );
      console.log(`login : ${token}`);
      res.cookie('token', token,  { maxAge : 60000, httpOnly: true, sameSite : 'strict' })  // secure : true (avec https)
      res.status(200).json({ message : 'utilisateur connecté' });
    }
    else { // unknown login
      console.log(`seller ${req.body.login} inconnu`);
      res.status(401).json({ message : `utilisateur ${req.body.login} inconnu`});
    }
  }
  catch (err) {
    console.log(`pb connexion ${err.message}`);
    res.status(500).redirect('/access/register');
  }
}

const logout = (req,res) => {
  res.cookie('token', '',  { maxAge : 2000, httpOnly: true, sameSite : 'strict' }) // secure : true
  res.status(200).json({ message : 'utilisateur déconnecté' });
}

module.exports.login = login;
module.exports.loginForm = loginForm;
module.exports.register = register;
module.exports.registerForm = registerForm;
module.exports.logout = logout;
