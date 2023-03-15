const router = require("express").Router();
const { token, mailservice } = require("../service/mailservice");
const {
  verifytoken,
  verifytokenandAuth,
  verifytokenadmin,
} = require("../service/verification");

router.post("/forgetpassword", mailservice);

module.exports = router;
