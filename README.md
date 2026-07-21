# Sistema de Controle de Presença - Checkpoint

Sistema de check-in, confirmação de presença e check-out utilizando:

- Netlify
- Netlify Functions
- Firebase Firestore
- Google Sheets (Painel Administrativo)

## Funcionalidades

- Check-in por QR Code
- Confirmação de presença
- Check-out
- Painel administrativo
- Integração com Google Sheets
- Firestore protegido por Netlify Functions

## Tecnologias

- HTML
- CSS
- JavaScript
- Firebase Firestore
- Firebase Admin SDK
- Netlify Functions
- Google Apps Script

## Configuração

Crie as seguintes variáveis de ambiente na Netlify:

```
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
ADMIN_KEY=
```

## Instalação

```bash
npm install
```

Executar localmente:

```bash
netlify dev
```

## Estrutura

```
/
│
├── index.html
├── style.css
├── main.js
│
├── netlify/
│   └── functions/
│       ├── firebaseAdmin.js
│       ├── checkin.js
│       ├── confirm.js
│       ├── checkout.js
│       └── getRegistros.js
│
└── google-sheets/
    └── Code.gs
```

## Licença

MIT