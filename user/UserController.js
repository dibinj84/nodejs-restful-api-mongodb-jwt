const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

const User = require('./User');


router.post('/', function(req, res){
  User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    }, function(err, user){
      if (err) return res.status(500).send("There was a problem adding information to the Database!");

      res.status(200).send(user);
  });
});


router.get('/', function(req, res){
  User.find({}, function(err, users){
    if(err) return res.status(500).send("There was a problem finding the users");

    res.status(200).send(users);
  });

});


router.get('/:id', function(req, res){
  User.findById(req.params.id, {password: 0}, function(err, user){
    if (err) return res.status(500).send('No user found');
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  })
})


router.put('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id,req.body, {new:true}, function(err, user){
    if(err) return res.status(500).send("There was a problem for updating the user!");
    res.status(200).send(user);
  });

})


router.delete('/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    if (err) return res.status(500).send('There was a problem deleting the user!')
    res.status(200).send("User " + user.name + " was deleted!");
  });

});


module.exports = router;