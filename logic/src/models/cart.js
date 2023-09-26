const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Types.ObjectId, ref: "users", required: true },
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
                street: { type: String },
                pincode: { type: Number },
                state: { type: String }
            }
        ],
        total: { type: Number, default: 0 }
    })

const cart = mongoose.model("Cart", cartSchema)

module.exports = cart