const Seller = require('../models/sellers.model').model;

module.exports.home = (_,res) => res.redirect('/account.html');
