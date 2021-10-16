import { Router } from "express";
import { routes as userRoutes } from "./users.routes";

const router = Router();

// users
router.use(userRoutes);

export { router };
