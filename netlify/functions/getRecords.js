import { db } from "./firebaseAdmin.js";

export async function handler(event) {

    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405
        };
    }

    if (event.headers.authorization !== process.env.ADMIN_KEY) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                error: "Não autorizado."
            })
        };
    }

    try {

        const snapshot = await db.collection("registros").get();

        const registros = [];

        snapshot.forEach(doc => {
            registros.push(doc.data());
        });

        registros.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

        return {
            statusCode: 200,
            body: JSON.stringify(registros)
        };

    } catch (e) {

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: e.message
            })
        };

    }

}