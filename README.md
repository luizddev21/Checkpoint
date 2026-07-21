# Integração com Google Sheets

1. Crie uma nova planilha.
2. Abra **Extensões → Apps Script**.
3. Cole o conteúdo de `Code.gs`.
4. Altere:

```javascript
const URL = "https://SEU_SITE.netlify.app/.netlify/functions/getRecords";
const ADMIN_KEY = "SUA_ADMIN_KEY";
```

## Estrutura

```text
/
├── index.html
├── style.css
├── main.js
├── netlify/
│   └── functions/
│       ├── firebaseAdmin.js
│       ├── checkin.js
│       ├── confirm.js
│       ├── checkout.js
│       └── getRegistros.js
└── google-sheets/
    └── Code.gs
```

## Licença

MIT