const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")
const cart = require("../models/cart")


router.get("/cart/:userId", cartController.getCart)

router.post("/cart", cartController.AddtoCart)

router.put("/cart/:userId/:productId", cartController.removeProduct)

router.post("/")

router.post("/cart/create-checkout-session", cartController.checkout)

router.delete("/cart/:userId", cartController.deleteCart)

router.get("/cart/address/:userId", cartController.checkAddress)

router.post("/cart/address/:userId", cartController.addAddress)

router.get("/payment/success/:userId",cartController.orders )

module.exports = router