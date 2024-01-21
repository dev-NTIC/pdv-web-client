const express = require("express");
const { checkAuthenticated } = require("../../app/http/middlewares/auth");

const {salesIndex, createSale} = require("../../app/http/controllers/web/dashboard/dashboard/sales/sales");
const {profileIndex} = require("../../app/http/controllers/web/dashboard/dashboard/pdv/pdv");
const {profileUpdate} = require("../../app/http/controllers/web/dashboard/dashboard/pdv/profile");
const {productIndex} = require("../../app/http/controllers/web/dashboard/dashboard/products/products");
const {giftsIndex} = require("../../app/http/controllers/web/dashboard/dashboard/gifts/gifts");
const {giftsOrders} = require("../../app/http/controllers/web/dashboard/dashboard/gifts/giftOrders");

const router = express.Router();

router.get("/dashboard", checkAuthenticated, salesIndex);

router.get("/dashboard/sales", checkAuthenticated, salesIndex);

router.get("/dashboard/new-sale", checkAuthenticated, createSale);

router.get("/dashboard/profile", checkAuthenticated, profileIndex)

router.get("/dashboard/profileupdate", checkAuthenticated, profileUpdate);

router.get("/dashboard/products", checkAuthenticated, productIndex);

router.get("/dashboard/gifts", checkAuthenticated, giftsIndex);

router.get("/dashboard/gifts-orders", checkAuthenticated, giftsOrders);

module.exports = { webDashboardRoutes: router };
