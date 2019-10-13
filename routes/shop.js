const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.get("/checkout", isAuth, shopController.getCheckout);
// // since stripe doesn't need csrf token protection we need to excluded
// // by placing before csrf token generate in app.js
// // router.post("/create-order", isAuth, shopController.postOrder);

// supposed to work for the updated method but does not, to work with
// old method do not forget to install the old version of stripe
// router.get("/checkout/success", shopController.getCheckoutSuccess);
// router.get("/checkout/cancel", shopController.getCheckout);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/orders/:orderId", isAuth, shopController.getInvoice);

module.exports = router;

