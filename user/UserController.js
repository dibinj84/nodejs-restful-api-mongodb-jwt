const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

const User = require('./User');


router.post('/', (req, res) => {
  User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    }, (err, user) => {
      if (err) return res.status(500).send("There was a problem adding information to the Database!");

      res.status(200).send(user);
  });
});


router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if(err) return res.status(500).send("There was a problem finding the users");

    res.status(200).send(users);
  });

});


router.get('/:id', (req, res) => {
  User.findById(req.params.id, {password: 0}, (err, user) => {
    if (err) return res.status(500).send('No user found');
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  })
})


router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id,req.body, {new:true}, (err, user) => {
    if(err) return res.status(500).send("There was a problem for updating the user!");
    res.status(200).send(user);
  });

})


router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).send('There was a problem deleting the user!')
    res.status(200).send("User " + user.name + " was deleted!");
  });

});


module.exports = router;
