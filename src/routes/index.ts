import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
    res.status(200).send('<h1 style="text-align: center">App Online!</h1>');
});

export { router };
