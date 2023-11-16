const router = require("express").Router();
const { exportUser } = require("../controler/Export.js");
// const router = express.Router();

// router.post("/forgetpassword", Forgetpassword);
router.get("/export", exportUser);

module.exports = router;
