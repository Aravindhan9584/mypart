const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  authHeaders = req.headers.token;
  if (authHeaders) {
    const token = authHeaders;
    // console.log(token)
    jwt.verify(token, process.env.JWT_PASS, (error, username) => {
      if (error) res.status(403).json("token not valid!");
      req.username = username;
      next();
    });
  } else {
    return res.status(500).json({ error: "your not a authenticated" });
  }
};

const verifytokenandAuth = (req, res, next) => {
  verifytoken(req, res, () => {
    // const idd ={id:_id}
    if (req.username.id === req.params.id || req.username.isAdmin) {
      next();
    } else {
      res.status(403).json("your not allow to do that! ");
    }
  });
};

const verifytokenadmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.username.isAdmin) {
      next();
    } else {
      res.status(403).json("your not allow to do that! ");
    }
  });
};

module.exports = { verifytoken, verifytokenandAuth, verifytokenadmin };
