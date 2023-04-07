const router = require("express").Router();
const Usercontroler = require("../controler/UserUpdate");
const {
  verifytoken,
  verifytokenandAuth,
  verifytokenadmin,
} = require("../service/verification");

router.get("/singleuser/:id", Usercontroler.getsingleuser);
router.get("/getalluser", verifytokenadmin, Usercontroler.getalluser);
router.put("/updateuser/:id", verifytokenandAuth, Usercontroler.Updateuser);
router.delete("/deleteuser/:id", verifytokenandAuth, Usercontroler.deleteuser);

module.exports = router;
