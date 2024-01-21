const express = require("express");

const router = express.Router();
const { getAllGiftsEndpoint } = require("../../app/http/controllers/api/pdv/gifts/gifts");
const {
    signupEndpoint,
} = require("../../app/http/controllers/api/auth/signUp");
const multer = require("multer");
const {
    validateSignup,
} = require("../../app/http/requests/auth/signupRequest");
const {
    getAllProductsEndroint,
} = require("../../app/http/controllers/api/pdv/products/products");
const { createSaleEndpoint } = require("../../app/http/controllers/api/pdv/sales/sales");
const { validateSale } = require("../../app/http/requests/pdv/sales/saleRequest");
const {
    getProfleEndPoint,
    updateProfileEndpoint,
} = require("../../app/http/controllers/api/pdv/profile/profile");
const { checkAuthenticated, apiCheckAuthenticated} = require("../../app/http/middlewares/auth");
const {
    validateUpdateProfile,
} = require("../../app/http/requests/pdv/profile/profileRequest");
const { getPdvSalesEndpoit} = require("../../app/http/controllers/api/pdv/pdv");
const {
    getAllPdvGiftOrders,
    createGiftOrderEndPoint,
} = require("../../app/http/controllers/api/pdv/gifts/giftOrder");

router.get("/api/v1/dashboard/profile", checkAuthenticated, getProfleEndPoint);
router.patch(
    "/api/v1/profile",
    apiCheckAuthenticated,
    validateUpdateProfile(),
    updateProfileEndpoint
);

router.get("/api/v1/dashboard/products",apiCheckAuthenticated, getAllProductsEndroint);
router.get("/api/v1/dashboard/gifts", apiCheckAuthenticated, getAllGiftsEndpoint);

router.get(
    "/api/v1/dashboard/gift-orders",
    apiCheckAuthenticated,
    getAllPdvGiftOrders
);

router.post(
    "/api/v1/dashboard/gift-orders",
    apiCheckAuthenticated,
    createGiftOrderEndPoint
);

router.post("/api/v1/signup", multer().any(), validateSignup(), signupEndpoint);
router.get("/api/v1/dashboard/sales", apiCheckAuthenticated, getPdvSalesEndpoit);
router.post(
    "/api/v1/dashboard/sales",
    apiCheckAuthenticated,
    validateSale(),
    createSaleEndpoint
);

module.exports = { mobileApi: router };
