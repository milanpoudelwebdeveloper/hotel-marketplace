const { expressjwt } = require("express-jwt");

//we can access user id by req.user

export const requireSignIn = expressjwt({
  //secret and expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
