import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { registerSchema } from "../schemas/register.schema.js";
import { loginSchema } from "../schemas/login.schema.js";

const authRouter = Router();

authRouter.post("/cadastro", validateSchema(registerSchema), signup);

authRouter.post("/", validateSchema(loginSchema), signin);

export default authRouter;