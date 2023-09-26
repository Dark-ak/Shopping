const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    user_id: {type: mongoose.Types.ObjectId, ref: "users", required:true},
    products: [
        {
            productId: Number,
            name: String,
            image: String,
            price: Number,
            quantity: Number,
            _id: false
        }
    ],
    address: [
        {
            street: String,
            pincode: Number,
            state: String,
        }
    ],
    total: { type: Number }

})

const order = mongoose.model("Order", orderSchema)

module.exports = order