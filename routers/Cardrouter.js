const Cardcontroller = require("../controler/card");
const router = require("express").Router();
const {
  verifytoken,
  verifytokenandAuth,
  verifytokenadmin,
  verifyUser,
} = require("../service/verification");

router.post("/create", verifytoken, verifyUser, Cardcontroller.createcard);
router.get("/getonecard/:id", Cardcontroller.getcard);
router.get("/getallcard", verifytokenadmin, Cardcontroller.getallcard);
router.put("/updatecard/:id", Cardcontroller.Upadtecard);
router.delete("/deletecard/:id", verifytokenandAuth, Cardcontroller.deletecard);

// console.log("hi this the router link card");

module.exports = router;
