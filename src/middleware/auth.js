const jwt = require("jsonwebtoken");
const authToken = async (req, res, next) => {
  try {
    const bearerHeader = await req.headers.authorization;
    if (!bearerHeader) {
      return res.sendStatus(403);
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    if (!bearerToken) {
      return res.sendStatus(403);
    }
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.auth = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};
module.exports = { authToken };
