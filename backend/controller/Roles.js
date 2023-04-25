const RoleModel = require("../models/RolesModel")

const RoleController = {
    // get all order
    getAllRole: async (req, res) => {
        try {
            const user = await RoleModel.find();
            res.status(200).json(user)
        }
        catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // create, add role
    createRole: async (req, res) => {
        try {
            const newRoles = {
                role_name: req.body.role_name,
                role_description: req.body.role_description,
                role_status: req.body.role_status

            };
            const role = new RoleModel(newRoles);
            await role.save();
            res.status(200).json(role)
        } catch (e) {
            res.status(500).json({ err: e })
            console.log(res)
        }
    }
}

module.exports = RoleController