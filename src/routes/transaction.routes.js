import { Router } from "express";
import { deleteTransaction, editTransaction, getTransactions, setTransaction } from "../controllers/transactions.controller.js";
import { validateSchema, validateSchemaParams } from "../middlewares/validateSchema.middleware.js";
import { numberSchema } from "../schemas/number.schema.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { paramsIdSchema } from "../schemas/id.schema.js";
import { paramsTypeSchema } from "../schemas/type.schema.js";
import { paramsSchema } from "../schemas/params.schema.js";

const transactionRouter = Router();

transactionRouter.use(authValidation);

transactionRouter.post("/nova-transacao/:tipo", validateSchemaParams(paramsTypeSchema), validateSchema(numberSchema), setTransaction);

transactionRouter.get("/home", getTransactions);

transactionRouter.delete("/home/:id", validateSchemaParams(paramsIdSchema), deleteTransaction);

transactionRouter.put("/editar-registro/:tipo/:id", validateSchema(numberSchema), validateSchemaParams(paramsSchema), editTransaction);

export default transactionRouter;