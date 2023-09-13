const express = require('express');
const { signUp, login } = require('../controllers/userController/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router  = express.Router();


router.route('/signUp/:role').post(signUp);
router.route('/login/:role').post(login);
router.route('/test').get((req,res)=>{
    res.json({
        message:"Testing success",
    })
})
router.route('/isAuthenticatedUser').get(isAuthenticatedUser)

module.exports = router

