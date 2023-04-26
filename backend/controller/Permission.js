const PermissionModel = require("../models/PermissionModel")

const PermissionController = {
    // get all permission
    getAllPermission: async (req, res) => {
        try {
            const per = await PermissionModel.find();
            res.status(200).json(per)
        }
        catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // create, add role
    createPermission: async (req, res) => {
        try {
            const newPer = {
                per_name: req.body.per_name,
                per_name_display: req.body.per_name_display,
                per_description: req.body.role_description,
                per_status: req.body.role_status

            };
            const role = new PermissionModel(newPer);
            await role.save();
            res.status(200).json(role)
        } catch (e) {
            res.status(500).json({ err: e })
            console.log(res)
        }
    },

}

module.exports = PermissionController