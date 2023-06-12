const router = require("express").Router();
const Usercontroler = require("../controler/UserUpdate");
const {
  verifymanager,
  verifytoken,
  verifytokenandAuth,
  verifytokenadmin,
  verifyUser,
} = require("../service/verification");

router.get("/singleuser/:id", Usercontroler.getsingleuser);
router.get("/getalluser", verifytokenadmin, Usercontroler.getalluser);
router.put("/updateuser/:id", verifytokenandAuth, Usercontroler.Updateuser);
router.delete(
  "/deleteuser/:id",
  verifytokenandAuth,
  verifyUser,
  Usercontroler.deleteuser
);

module.exports = router;
