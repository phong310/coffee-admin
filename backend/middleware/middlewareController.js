const jwt = require("jsonwebtoken");

const middlewareController = {

    // verify token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            })
        } else {
            res.status(403).json("You're not authenticated ");
        }
    },


    // verify token ADMIN
    verifyAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role.includes("ADMIN")) {
                next()
            } else {
                res.status(403).json("Chỉ ADMIN mới được truy cập !")
            }
        })
    }
};

module.exports = middlewareController