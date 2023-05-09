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
            process.env.JWT_ACCESS_KEY, { expiresIn: "1d" }
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
                const refreshToken = authController.generateRefeshToken(user)
                refreshTokenArr.push(refreshToken)

                // lưu refresh token vào cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
                res.status(200).json({ user, accessToken, refreshToken })
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
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated")

        if (!refreshTokenArr.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid")
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
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
        })

    },


    // LOGOUT
    logOutUser: async (req, res) => {
        refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken);
        res.clearCookie("refreshToken");
        res.status(200).json("Logout success !")
    }
}

module.exports = authController