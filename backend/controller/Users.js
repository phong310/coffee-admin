const UserModel = require("../models/UserModel")

const UserController = {
    // get all user
    getAllUser: async (req, res) => {
        try {
            const user = await UserModel.find();
            res.status(200).json(user)
        }
        catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // create user (register)
    createUser: async (req, res) => {
        try {
            const newUser = {
                username: req.body.username,
                password: req.body.password,
                confirm: req.body.confirm,
                email: req.body.email,
                role: req.body.role,
                phone: req.body.phone
            };
            const user = new UserModel(newUser);
            await user.save();
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({ err: e })
            console.log(res)
        }
    }
}

module.exports = UserController