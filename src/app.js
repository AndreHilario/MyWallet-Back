import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
//Fazer controllers no fim!


const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
} catch (err) {
    console.log(err.message);
}
const db = mongoClient.db();

// Cadstro do cliente na rota "/cadastro"
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

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
});
//Fim do cadastro

//Login do cliente na rota "/"
app.post("/", async (req, res) => {

    const { email, password } = req.body;


    const loginSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(3).required()
    });

    const validation = loginSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {

        const infoLogin = await db.collection("users").findOne({ email });
        if (!infoLogin) res.status(409).send("E-mail not found");

        const comparePasssword = bcrypt.compareSync(password, infoLogin.password);
        if (!comparePasssword) return res.status(401).send("Incorrect password");

        const token = uuid();
        await db.collection("sessions").insertOne({ token, idUser: infoLogin._id });
        res.status(200).send({ name: infoLogin.name, token });

    } catch (err) {
        res.status(500).send(err.message);
    }
});
//Fim do login

app.post("/nova-transacao/:tipo", async (req, res) => {

    const { tipo } = req.params;
    const { description, price } = req.body;
    const { authorization } = req.headers;

    const date = dayjs();
    const formatedDate = date.format("DD/MM");

    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send("User unauthorized");

    const verifyBody = { description, status: tipo, price };

    const numberSchema = Joi.object({
        description: Joi.required(),
        status: Joi.string().valid("entrada", "saida").required(),
        price: Joi.number().positive().precision(2).required()
    });

    const validation = numberSchema.validate(verifyBody, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {

        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.sendStatus(401);

        const correctBody = { ...verifyBody, date: formatedDate, idUser: session.idUser };
        await db.collection("transactions").insertOne(correctBody);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/home", async (req, res) => {

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send("User unauthorized");

    try {

        const session = await db.collection("sessions").findOne({ token });
        if (!session || !session.idUser) return res.sendStatus(401);

        const test = session.idUser

        const transactionsList = await db.collection("transactions").find({idUser: test}).toArray();
        res.send(transactionsList);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

