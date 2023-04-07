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
                phone: req.body.phone,
                role: req.body.role,
                status: req.body.status,
                avatar: req.body.avatar,
                birthday: req.body.birthday
            };
            const user = new UserModel(newUser);
            await user.save();
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({ err: e })
            console.log(res)
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            const UserId = req.params.id
            const itemDelete = await UserModel.findByIdAndRemove(UserId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // update user
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const userUpdate = {
                username: req.body.username,
                password: req.body.password,
                confirm: req.body.confirm,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                status: req.body.status,
                avatar: req.body.avatar,
                birthday: req.body.birthday
            };
            const query = { _id: userId };
            const options = { new: true };
            const result = await UserModel.findOneAndUpdate(query, userUpdate, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // Reset user password
    resetPassword: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId);

            // Kiểm tra xem người dùng có tồn tại hay không
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Cập nhật mật khẩu của người dùng
            user.password = '123@123a'; // Thay đổi mật khẩu tại đây
            user.confirm = '123@123a';

            await user.save();
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    },

    // search user
    searchUser: async (req, res) => {
        try {
            const email = req.query.email;
            const role = req.query.role;
            const status = req.query.status;
            let query = {};
            if (email && status && role) {
                query = { email: new RegExp(email, "i"), status: status, role: role };
            } else if (status && role) {
                query = { status: status, role: role };
            } else if (email) {
                query = { email: new RegExp(email, "i") };
            } else if (status) {
                query = { status: status };
            } else if (role) {
                query = { role: role }
            }
            const Users = await UserModel.find(query);
            res.status(200).json(Users);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    }

}

module.exports = UserController