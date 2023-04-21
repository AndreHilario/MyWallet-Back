import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function setTransaction(req, res) {

    const { tipo } = req.params;

    const date = dayjs();
    const formatedDate = date.format("DD/MM");

    try {

        const session = res.locals.session;

        const correctBody = { ...req.body, status: tipo, date: formatedDate, idUser: session.idUser };
        await db.collection("transactions").insertOne(correctBody);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function getTransactions(req, res) {

    try {

        const session = res.locals.session;

        const transactionsList = await db.collection("transactions").find({ idUser: session.idUser }).toArray();
        res.send(transactionsList);

    } catch (err) {
        res.status(500).send(err.message);
    }
};