const router = require("express").Router();
const { Forgetpassword } = require("../service/mailservice");
const authendication = require("../controler/auth");
const {
  verifytoken,
  verifytokenandAuth,
  verifytokenadmin,
} = require("../service/verification");

router.post("/forgetpassword", Forgetpassword);
router.post("/register", authendication.Registeruser);
router.post("/login", authendication.Login);

module.exports = router;
