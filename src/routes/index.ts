import { Router } from "express";
import { routes as userRoutes } from "./user.routes";

const router = Router();

router.get("/", function (req, res) {
    res.status(200).send('<h1 style="text-align: center">App Online!</h1>');
});
router.use(userRoutes);

export { router };
