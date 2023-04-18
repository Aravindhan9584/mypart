const jwt = require("jsonwebtoken");
const createError = require("../utility/createError");

const verifytoken = (req, res, next) => {
  const Token = req.cookies.accessToken;
  if (!Token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(Token, process.env.JWT_PASS, (error, username) => {
    if (error) res.status(403).json("token not valid!");
    req.username = username;
    next();
  });
  // } else {
  //   return next(createError(500, "your not a authenticated"));
  // }
};

const verifytokenandAuth = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.username.id === req.params.id || req.username.isAdmin) {
      next();
    } else {
      next(createError(500, "your not allow to do that! "));
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
