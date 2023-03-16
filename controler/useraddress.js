const Address = require("../models/Address");
const router = require("express").Router();

router.post("/Addresscreate", async (req, res, next) => {
  try {
    const newadd = await Address(req.body);
    const saveadd = await newadd.save();
    res.status(200).json(saveadd);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
