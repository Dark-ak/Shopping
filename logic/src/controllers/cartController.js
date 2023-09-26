require("dotenv").config()
const Cart = require("../models/cart")
const Users = require("../models/user")
const Orders = require("../models/orders")
const stripe = require("stripe")(process.env.SECRET_KEY)
const { nanoid, customAlphabet } = require('nanoid')

async function AddtoCart(req, res) {
    const { id, productId, name, image, price, quantity } = req.body
    try {
        let cart = await Cart.findOne({ _id: id })
        if (cart) {
            let itemIndex = cart.products.findIndex(p => p.productId == productId);

            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity += quantity
                cart.total += productItem.price
                cart.products[itemIndex] = productItem;
            } else {
                cart.total += price
                cart.products.push({ id, productId, name, image, price, quantity })
            }

            cart = await cart.save();
            return res.status(201).send(cart)
        } else {
            let total = price * quantity
            const newCart = await Cart.create({
                id,
                products: [
                    { productId, name, image, price, quantity }
                ],
                total
            })

            res.status(201).json({ message: "Added to cart" })

        }

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

async function getCart(req, res) {

    const userId = req.params.userId;
    try {
        const cart = await Cart.findById(userId)
        if (cart == null) {
            return res.status(204).json({ message: "Your cart is empty" })
        }
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json({ message: "Internal Server error" })
    }
}

async function removeProduct(req, res) {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ _id: userId })

        if (cart) {
            const itemIndex = cart.products.findIndex(p => p.productId == productId);
            const products = cart.products[itemIndex]

            if (products.quantity > 1) {
                products.quantity -= 1;
                cart.total -= products.price
                cart.products[itemIndex] = products
            }

            else {
                await Cart.updateOne({ _id: userId }, { $pull: { products: { productId: productId } } })
                cart.total -= products.price
            }

            await cart.save()

            if (cart.products.length === 1 && products.quantity < 1) {
                await cart.deleteOne({ _id: userId })
            }
        }


        res.status(200).json({ message: "Working" })
    } catch (err) {
        console.error(err.message)
    }
}

async function deleteCart(req, res) {
    const { userId } = req.params
    const cart = Cart.findById({ userId })

    try {
        await cart.deleteOne({ _id: userId })

        res.status(200).json({ message: "works" })
    }
    catch (err) {
        res.status(404)
        console.log(err)
    }

}

async function checkAddress(req, res) {
    try {
        const cart = await Cart.findOne({ _id: req.params.userId, address: { $exists: true } })
        if (cart) {
            const address = cart.address[0]
            const data = {
                street: address.street,
                pincode: address.pincode,
                state: address.state
            }

            res.status(200).json(data)
        }
    } catch (err) {
        console.log(err)
    }
}

async function addAddress(req, res) {
    const { street, pincode, state } = req.body

    try {
        const cart = await Cart.updateOne({ _id: req.params.userId }, {
            $set: {
                address: {
                    street: street,
                    pincode: pincode,
                    state: state
                }
            }
        })
        res.status(201).json({ message: "Added Address" })
    } catch (err) {
        console.log(err.message)
    }
}

async function checkout(req, res) {
    const { id } = req.body

    const cart = await Cart.findOne({ _id: id })
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Total Amount',
                    },
                    unit_amount: ((cart.total * 0.95)).toFixed(2) * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:5000/checkout/payment/success/${id}`,
        cancel_url: 'http://localhost:3000/checkout/failure',
    });

    res.json({ url: session.url });

}

async function orders(req, res) {
    try {
        const cart = await Cart.findById(req.params.userId)
        const id = customAlphabet("1234567890abcdefgh",6)
        const newOrder = await Orders.create({
            _id: id(),
            user_id: cart._id,
            products: cart.products,
            address: {
                street: cart.address[0].state,
                state: cart.address[0].state,
                pincode: cart.address[0].pincode
            },
            total: (cart.total * 0.95).toFixed(2)
        })
        await cart.deleteOne({ _id: req.params.userId })
        res.redirect(`http://localhost:3000/checkout/payment/success/${id()}`)
        // res.status(200)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = { AddtoCart, getCart, removeProduct, deleteCart, checkout, checkAddress, addAddress, orders }