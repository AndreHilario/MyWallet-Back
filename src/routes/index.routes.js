import transactionRouter from "./transaction.routes.js";
import authRouter from "./auth.routes.js";
import { Router } from "express";

const router = Router();

router.use(authRouter);
router.use(transactionRouter);

export default router;