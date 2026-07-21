import { db } from "./firebaseAdmin.js";

export async function handler(event) {

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405
        };
    }

    try {

        const { uid, nome } = JSON.parse(event.body);

        const ref = db.collection("registros").doc(uid);

        const doc = await ref.get();

        if (!doc.exists) {

            await ref.set({
                id: uid,
                nome,
                nivel_verificacao: 1
            });

        } else {

            await ref.update({
                nome
            });

        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true
            })
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