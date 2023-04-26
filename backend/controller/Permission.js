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

    // create, add permission
    createPermission: async (req, res) => {
        try {
            const newPer = {
                per_name: req.body.per_name,
                per_name_display: req.body.per_name_display,
                per_description: req.body.per_description,
                per_status: req.body.per_status

            };
            const Permission = new PermissionModel(newPer);
            await Permission.save();
            res.status(200).json(Permission)
        } catch (e) {
            res.status(500).json({ err: e })
            console.log(res)
        }
    },


    // Delete permission
    deletePermission: async (req, res) => {
        try {
            const PerId = req.params.id
            const itemDelete = await PermissionModel.findByIdAndRemove(PerId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // update permission
    updatePermission: async (req, res) => {
        try {
            const PerId = req.params.id;
            const PerUpdate = {
                per_name: req.body.per_name,
                per_name_display: req.body.per_name_display,
                per_description: req.body.per_description,
                per_status: req.body.per_status
            };
            const query = { _id: PerId };
            const options = { new: true };
            const result = await PermissionModel.findOneAndUpdate(query, PerUpdate, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // search
    searchPermission: async (req, res) => {
        try {
            const perName = req.query.per_name_display;
            const perStatus = req.query.per_status
            let query = {};
            if (perName && perStatus) {
                query = { per_name_display: perName, per_status: perStatus };
            } else if (perName) {
                query = { per_name_display: perName }
            } else if (perStatus) {
                query = { per_status: perStatus }
            }
            const Permission = await PermissionModel.find(query);
            res.status(200).json(Permission);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    }


}

module.exports = PermissionController