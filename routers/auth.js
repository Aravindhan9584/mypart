const router = require("express").Router();
const { Forgetpassword, resetpassword } = require("../service/mailservice");
const authendication = require("../controler/auth");

router.post("/forgetpassword", Forgetpassword);
router.put("/resetpassword/:id/", resetpassword);
router.post("/register", authendication.Registeruser);
router.post("/login", authendication.Login);

module.exports = router;
