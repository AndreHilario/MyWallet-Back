import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

const date = dayjs();
const formattedDate = date.format("DD/MM");

export async function setTransaction(req, res) {

    const { tipo } = req.params;

    try {

        const session = res.locals.session;

        const correctBody = { ...req.body, status: tipo, date: formattedDate, idUser: session.idUser };
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

export async function deleteTransaction(req, res) {

    const { id } = req.params;

    try {

        const deleteResult = await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });
        if (deleteResult.deletedCount === 0) return res.status(404).send("Transaction not found");

        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function editTransaction(req, res) {

    const { tipo, id } = req.params;

    try {

        const findTransaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
        if (!findTransaction) return res.sendStatus(404);

        const session = res.locals.session;

        if (!findTransaction.idUser.equals(session.idUser)) return res.sendStatus(401);

        const editedBody = { ...req.body, status: tipo, date: formattedDate, idUser: session.idUser };

        await db.collection("transactions").updateOne(
            { _id: new ObjectId(id) },
            { $set: editedBody }
        );
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message)
    }
};