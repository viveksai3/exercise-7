const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

//get signup page
router.get('/new', controller.userSignUp);


//POST action after button click
router.post('/', controller.userSignUpAction);

//GET login page
router.get('/login', controller.userLogin);

//POST login action
router.post('/login', controller.userLoginAction);

//GET profile page
router.get('/profile', controller.userProfile);

//PUT /stories/:id: update the story identified by id
router.get('/logout', controller.userLogout);


module.exports = router;