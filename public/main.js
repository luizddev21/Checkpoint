// Criar
function setCookie(nome, valor, dias) {
    let expires = "";

    if (dias) {
        const data = new Date();
        data.setTime(data.getTime() + dias * 86400000);
        expires = "; expires=" + data.toUTCString();
    }

    document.cookie = `${nome}=${encodeURIComponent(valor)}${expires}; path=/`;
}

// Ler
function getCookie(nome) {
    const nomeEQ = nome + "=";
    const cookies = document.cookie.split(";");

    for (let c of cookies) {
        while (c.charAt(0) === " ") c = c.substring(1);

        if (c.indexOf(nomeEQ) === 0) {
            return decodeURIComponent(c.substring(nomeEQ.length));
        }
    }

    return null;
}

// Remover
function deleteCookie(nome) {
    document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function showError(msg) {
    const errorCamp = document.querySelector(".camp.error");

    errorCamp.querySelector("p").textContent = msg;

    errorCamp.classList.remove("hidden");
}

function goTo(page) {
    showPage(page);
}

async function callFunction(name, body) {
    const response = await fetch(`/.netlify/functions/${name}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro desconhecido.");
    }

    return data;
}

const pages = {
    checkin: document.querySelector("#checkinPage"),
    confirm: document.querySelector("#confirmPage"),
    checkout: document.querySelector("#checkoutPage"),
    success: document.querySelector("#successPage")
};

function showPage(page) {
    hideError();

    Object.values(pages).forEach(p => p.hidden = true);

    if (pages[page]) {
        pages[page].hidden = false;
    } else {
        pages.checkin.hidden = false;
    }
}

async function loadPage() {

    const params = new URLSearchParams(window.location.search);

    const token = params.get("t");

    if (!token) {
        return showError("QR Code inválido.");
    }

    try {

        const response = await fetch(`/.netlify/functions/getPage?t=${token}`);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        showPage(data.page);

    } catch {

        showError("QR Code inválido.");

    }

}

loadPage();

async function checkin() {
    try {

        const name = document.querySelector("#name").value.trim();

        if (!name) {
            throw new Error("Digite seu nome.");
        }

        let uid = getCookie("id");

        if (!uid) {
            uid = crypto.randomUUID();
            setCookie("id", uid, 2);
        }

        await callFunction("checkin", {
            uid,
            nome: name
        });

        goTo("success");

    } catch (e) {

        showError(e.message);

    }
}

async function checkout() {
     try {
        const uid = getCookie("id");

        if (!uid) {
            return showError("Você não fez check-in!");
        }

        await callFunction("checkout", {
            uid
        });

        goTo("success");
    } catch (e) {
        showError(e.message);
    }
}

async function confirm() {
    try {
        const uid = getCookie("id");

        if (!uid) {
            return showError("Você não fez check-in!");
        }

        await callFunction("confirm", {
            uid
        });

        goTo("success");
    } catch (e) {
        showError(e.message);
    }
}

document.addEventListener("click", (e) => {

    if (e.target.matches(".check-in-button")) {
        e.preventDefault();
        checkin();
    }

    if (e.target.matches(".confirm-button")) {
        e.preventDefault();
        confirm();
    }

    if (e.target.matches(".check-out-button")) {
        e.preventDefault();
        checkout();
    }

});

function hideError() {
    document.querySelector(".camp.error").classList.add("hidden");
}