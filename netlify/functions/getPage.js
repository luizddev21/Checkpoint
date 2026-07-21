export async function handler(event) {
    const token = event.queryStringParameters.t;

    if (!token) {
        return {
            statusCode: 404
        };
    }

    if (token === process.env.CHECKIN_TOKEN) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                page: "checkin"
            })
        };
    }

    if (token === process.env.CONFIRM_TOKEN) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                page: "confirm"
            })
        };
    }

    if (token === process.env.CHECKOUT_TOKEN) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                page: "checkout"
            })
        };
    }

    return {
        statusCode: 404
    };
}