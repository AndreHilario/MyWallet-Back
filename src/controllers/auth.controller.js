import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signup(req, res) {

    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    try {

        const searchUser = await db.collection("users").findOne({ email });
        if (searchUser) res.status(409).send("E-mail already registered");


        await db.collection("users").insertOne({ name, email, password: hash });

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function signin(req, res) {

    const { email, password } = req.body;

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
};