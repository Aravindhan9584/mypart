const jwt = require("jsonwebtoken");
const createError = require("../utility/createError");

const verifytoken = (req, res, next) => {
  const Token = req.cookies.accessToken;
  if (!Token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(Token, process.env.JWT_PASS, (error, User) => {
    if (error) res.status(403).json("token not valid!");
    req.User = User;
    next();
  });
  // } else {
  //   return next(createError(500, "your not a authenticated"));
  // }
};

const verifytokenandAuth = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.User.id === req.params.id || req.User.isAdmin) {
      next();
    } else {
      next(createError(500, "your not allow to do that! "));
    }
  });
};

// const verifymanager = (req, res, next) => {
//   verifytoken(req, res, () => {
//     if (req.User.id === req.params.id || req.User.role === "manager") {
//       next();
//     } else {
//       next(createError(500, "your not allow to do that! "));
//     }
//   });
// };

const verifytokenadmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.User.isAdmin) {
      next();
    } else {
      res.status(403).json("your not allow to do that! ");
    }
  });
};

const verifyUser = (req, res, next) => {
  // console.log("entered into verifyUser", req.user);
  // const id = User._id;
  if (req.User._id === req.params._id || req.User.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

module.exports = {
  verifytoken,
  verifytokenandAuth,
  verifytokenadmin,
  verifyUser,
};
