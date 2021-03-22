const jwt = require("jsonwebtoken");
const JWT_SECRET = 'hdhdjslsdldjdk';


function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified.user;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

module.exports = auth;