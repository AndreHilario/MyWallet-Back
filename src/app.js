import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import Joi from "joi";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
} catch (err) {
    console.log(err.message);
}
const db = mongoClient.db();

app.post("/cadastro", async (req, res) => {

    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(3).required(),
        checkPassword: Joi.string().min(3).required()
    });

    const validation = registerSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {

        const searchUser = await db.collection("users").findOne({ email });
        if (searchUser) res.status(409).send("E-mail already registered");


        await db.collection("users").insertOne({ name, email, password: hash });

        console.log({name, email, password: hash})

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

