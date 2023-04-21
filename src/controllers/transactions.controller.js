import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function setTransaction(req, res) {

    const { tipo } = req.params;

    const date = dayjs();
    const formattedDate = date.format("DD/MM");

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

    try {

        const session = res.locals.session;

        const findTransaction = await db.collection("transactions").findOne({ idUser: session.idUser });
        if (!findTransaction) return res.status(404).send("Transação não encontrada!");

        if (!findTransaction.idUser.equals(session.idUser)) return res.status(401).send("Usuário não autorizado");

        await db.collection("transactions").updateOne(
            { _id: session.idUser },
            { $set: req.body }
        );

        res.status(200).send("Transação atualizada");

    } catch (err) {
        res.status(500).send(err.message);
    }
}