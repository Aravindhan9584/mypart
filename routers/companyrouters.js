const router = require("express").Router();
const companys = require("../controler/company");

router.post("/createcompany", companys.createcompany);
router.get("/getonecompany/:id", companys.getcompany);
router.get("/getallcompany", companys.getallcompany);
router.put("/updatecompany/:id", companys.Upadtecompany);
router.delete("/deletecompany/:id", companys.deletecompany);

// console.log("hi this the router link company");

module.exports = router;
