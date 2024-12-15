const router = require('express').Router();
const { newUser,mainPage} = require('../Controllers/controllers');

router.post('/feedback',newUser)
router.post('/mainpage',mainPage)



module.exports = router