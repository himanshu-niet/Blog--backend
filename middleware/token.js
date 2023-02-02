const JWT = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  if (token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED);

  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
   
    if (err) return res.sendStatus(StatusCodes.UNAUTHORIZED);

    req.user = user;

    next();
  });
}

module.exports = authenticateToken;
