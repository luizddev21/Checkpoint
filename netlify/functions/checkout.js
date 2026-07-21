import { db } from "./firebaseAdmin.js";

export async function handler(event) {

    const { uid } = JSON.parse(event.body);

    const ref = db.collection("registros").doc(uid);

    const doc = await ref.get();

    if (!doc.exists) {

        return {
            statusCode: 404,
            body: JSON.stringify({
                error: "Você não fez check-in!"
            })
        };

    }

    const dados = doc.data();

    if (dados.nivel_verificacao < 2) {

        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Você não confirmou sua presença!"
            })
        };

    }

    await ref.update({
        nivel_verificacao: 3
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true
        })
    };

}