const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

const User = require('../user/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const VerifyToken = require('./VerifyToken');


router.post('/register', (req, res) => {

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password: hashedPassword
  }, function (err, user){

    if(err) return res.status(500).send("There was a problem registering the user.");

    const token = jwt.sign({id: user._id},  process.env.SECRET , {expiresIn : 86400});

    res.status(200).send({ auth : true, token : token});

  });

});



router.get('/me', VerifyToken, (req, res, next) => {

  User.findById(req.userId, {password: 0}, (err, user) => {
    if(err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);

  });

});


router.post('/login', (req, res) => {

  User.findOne({email : req.body.email}, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({id : user._id},  process.env.SECRET , {expiresIn : 86400});

    res.status(200).send({ auth : true, token : token});
  });

});


router.get('/logout', VerifyToken, (req, res, next) => {
  res.status(200).send({ auth: false, token: null });
});



module.exports = router;
