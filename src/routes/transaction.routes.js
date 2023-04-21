import { Router } from "express";
import { deleteTransaction, getTransactions, setTransaction } from "../controllers/transactions.controller.js";
import { validateSchema, validateSchemaParams } from "../middlewares/validateSchema.middleware.js";
import { numberSchema } from "../schemas/number.schema.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { paramsSchema } from "../schemas/params.schema.js";
import { paramsIdSchema } from "../schemas/id.schema.js";

const transactionRouter = Router();

transactionRouter.use(authValidation);

transactionRouter.post("/nova-transacao/:tipo", validateSchemaParams(paramsSchema), validateSchema(numberSchema), setTransaction);

transactionRouter.get("/home", getTransactions);

transactionRouter.delete("/home/:id", validateSchemaParams(paramsIdSchema), deleteTransaction);

export default transactionRouter;