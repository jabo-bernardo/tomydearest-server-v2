import { Hono } from "hono";
import AuthController from "../controllers/auth";
import { authenticationMiddleware } from "../middlewares/auth";

const authRoute = new Hono();
const authController = new AuthController();

authRoute.post("/authenticate", authController.authenticateUser);
authRoute.get("/me", authenticationMiddleware, authController.me);

export default authRoute;
