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


    // verify token & ADMIN
    verifyAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role.includes("ADMIN") || req.user.role.includes("DIRECTOR")) {
                next()
            } else {
                res.status(403).json("Chỉ ADMIN mới được truy cập !")
            }
        })
    },

    // Verify token & MANAGER
    verifyProduct: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role.includes("MANAGER") || req.user.role.includes("LEADER")
                || req.user.role.includes("ADMIN") || req.user.role.includes("DIRECTOR") || req.user.role.includes("STAFF")) {
                next()
            } else {
                res.status(403).json("không có quyền truy cập !")
            }
        })
    },

    // verify token & LEADER
    verifyCate: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role.includes("LEADER") || req.user.role.includes("MANAGER")
                || req.user.role.includes("ADMIN")
                || req.user.role.includes("DIRECTOR")) {
                next()
            } else {
                res.status(403).json("không có quyền truy cập !")
            }
        })
    }

};

module.exports = middlewareController