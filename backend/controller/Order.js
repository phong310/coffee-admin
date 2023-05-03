const OrderModel = require("../models/OrderModel")

const OrderController = {
    // get all order
    getAllOrder: async (req, res) => {
        try {
            const user = await OrderModel.find();
            res.status(200).json(user)
        }
        catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // create, add order
    createOrder: async (req, res) => {
        try {
            const newOrder = {
                order_id: req.body.order_id,
                order_products: req.body.order_products,
                customer_name: req.body.customer_name,
                customer_phone: req.body.customer_phone,
                customer_address: req.body.customer_address,
                order_pay: req.body.order_pay,
                order_description: req.body.order_description,
                order_status: req.body.order_status

            };
            const user = new OrderModel(newOrder);
            await user.save();
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({ err: e })
            console.log(res)
        }
    },


    // Delete order
    deleteOrder: async (req, res) => {
        try {
            const OrderId = req.params.id
            const itemDelete = await OrderModel.findByIdAndRemove(OrderId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // update order
    updateOrder: async (req, res) => {
        try {
            const OrderId = req.params.id;
            const orderUpdate = {
                order_id: req.body.order_id,
                order_products: req.body.order_products,
                customer_name: req.body.customer_name,
                customer_phone: req.body.customer_phone,
                customer_address: req.body.customer_address,
                order_pay: req.body.order_pay,
                order_description: req.body.order_description,
                order_status: req.body.order_status
            };
            const query = { _id: OrderId };
            const options = { new: true };
            const result = await OrderModel.findOneAndUpdate(query, orderUpdate, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // search
    searchOrder: async (req, res) => {
        try {
            const customer_name = req.query.customer_name;
            const order_pay = req.query.order_pay;
            const order_status = req.query.order_status;
            let query = {};
            if (customer_name && order_status && order_pay) {
                query = { customer_name: new RegExp(customer_name, "i"), order_status: order_status, order_pay: order_pay };
            } else if (order_status && order_pay) {
                query = { order_status: order_status, order_pay: order_pay };
            } else if (customer_name) {
                query = { customer_name: new RegExp(customer_name, "i") };
            } else if (order_status) {
                query = { order_status: order_status };
            } else if (order_pay) {
                query = { order_pay: order_pay }
            }
            const Orders = await OrderModel.find(query);
            res.status(200).json(Orders);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    }
}

module.exports = OrderController