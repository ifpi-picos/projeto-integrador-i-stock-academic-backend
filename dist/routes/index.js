"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = express_1.Router();
exports.router = router;
router.get("/", function (req, res) {
    res.status(200).send('<h1 style="text-align: center">App Online!</h1>');
});
