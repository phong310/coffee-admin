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
    },

    // Delete role
    deleteRole: async (req, res) => {
        try {
            const RoleId = req.params.id
            const itemDelete = await RoleModel.findByIdAndRemove(RoleId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // update role
    updateUser: async (req, res) => {
        try {
            const RoleId = req.params.id;
            const roleUpdate = {
                role_name: req.body.role_name,
                role_description: req.body.role_description,
                role_status: req.body.role_status
            };
            const query = { _id: RoleId };
            const options = { new: true };
            const result = await RoleModel.findOneAndUpdate(query, roleUpdate, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },
}

module.exports = RoleController