const { promisify } = require("util");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const config = require("./../utils/config");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");

const client = new OAuth2Client(config.CLIENT_ID);

const createToken = (id, role) => {
  const jwtToken = jwt.sign({ id, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
  return jwtToken;
};

const createSendToken = (user, statusCode, res) => {
  try {
    const token = createToken(user._id, user.role);
    const expireAt = new Date(
      Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    );
    const cookieOptions = {
      expires: expireAt,
      httpOnly: true,
    };

    if (config.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }

    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
      status: "success",
      verification: true,
      user,
      expireAt,
      token,
    });
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

const verifyJwtToken = catchAsync(async (req, res, next) => {
  // 1) Getting token and check ff it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  // 2) Verifying token
  const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

  req.jwtPayload = {
    id: decoded.id,
    role: decoded.role,
  };
  next();
});

const loggedInUser = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.jwtPayload.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    ////console.log(req.jwtPayload.role);
    ////console.log(roles);
    if (!roles.includes(req.jwtPayload.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

const googleLogin = catchAsync(async (req, res, next) => {
  const { tokenId } = req.body;
  if (!tokenId) {
    return next(new AppError("User not logged in.", 403));
  }
  // //console.log(tokenId);
  client
    .verifyIdToken({ idToken: tokenId, audience: config.CLIENT_ID })
    .then(async (response) => {
      const { name, email, email_verified, picture } = response.payload;

      if (email_verified) {
        try {
          User.findOne({ email }).populate("invoices").exec(async (err, user) => {
            if (err) {
              return res.status(404).json({
                message: err.message,
              });
            } else {
              if (user) {
                await User.updateOne({ email }, { image: picture });
                createSendToken(user, 200, res);
              } else {
                const newUser = await User.create({
                  username: name,
                  email: email,
                  image: picture,
                });
                createSendToken(newUser, 200, res);
              }
            }
          });
        } catch (err) {
          throw new AppError(err.message, 401);
        }
      }
    })
    .catch((err) => {
      throw new AppError(err.message, 401);
    });
});

const logout = (req, res, next) => {
  res.clearCookie("jwt", {
    path: "/",
  });
  res.status(200).json({
    status: "success",
    message: "logged out",
  });
};

const loginStatus = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "logged in",
    user: req.user,
  });
};

const protect = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.user.email });

  if (!user) return next(new AppError("User not found", 404));
  req.user = user;

  next();
});

module.exports = {
  createToken,
  createSendToken,
  verifyJwtToken,
  loggedInUser,
  restrictTo,
  googleLogin,
  logout,
  loginStatus,
  protect,
};
