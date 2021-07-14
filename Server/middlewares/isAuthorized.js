const jwt = require("jsonwebtoken");
const config = require('config');


const isAuthorized = (req, res, next) => {
  const authHeader = req.headers["token"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.get('jwtSecret'), (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user);
    next();
  });
};

module.exports = isAuthorized;