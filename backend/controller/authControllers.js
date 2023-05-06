const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")

// Tượng trưng cho một db chỉ lưu trữ refreshToken
let refreshTokenArr = [];

const authController = {

    // generate access Token
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_ACCESS_KEY, { expiresIn: "20s" }
        )
    },

    // generate refesh token:
    generateRefeshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_REFESH_KEY, { expiresIn: "365d" }
        )
    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await UserModel.findOne({
                username: req.body.username,
                password: req.body.password,
            })

            if (!user) {
                return res.status(404).json("Wrong username & password")
            }

            if (user) {
                const accessToken = authController.generateAccessToken(user)
                const refeshToken = authController.generateRefeshToken(user)
                refreshTokenArr.push(refeshToken)

                // lưu refresh token vào cookie
                res.cookie("refeshToken", refeshToken, {
                    httpOny: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })

                res.status(200).json({ user, accessToken })
            }
        } catch (e) {
            console.error("Error while finding user:", e.message);
            res.status(500).json({ error: e.message });
        }
    },


    // Nhiệm vụ chính của requestRefeshToken:
    //     1. Lấy refresh từ cookie đã được lưu khi đăng nhập,
    //     2. Xác thực refresh token đó.
    //     3. Tạo ra accessToken và refreshToken mới

    requestRefeshToken: (req, res) => {
        const refreshToken = req.cookies.refeshToken;
        if (!refreshToken) return res.status(403).json("You're not authenticated")

        if (!refreshTokenArr.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valide")
        }

        // verify refresh token
        jwt.verify(refreshToken, process.env.JWT_REFESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            // Nếu có refresh token mới rồi lọc cái cũ ra
            refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken)


            // Tạo mới một accessToken và refreshToken
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefeshToken(user);
            refreshTokenArr.push(newRefreshToken);

            // lưu refresh token vào cookie
            res.cookie("refeshToken", newRefreshToken, {
                httpOny: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            res.status(200).json({ accessToken: newAccessToken })
        })

    },


    // LOGOUT
    logOutUser: async (req, res) => {
        res.clearCookie("refeshToken");
        refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refeshToken);
        res.status(200).json("Logout success")
    }
}

module.exports = authController