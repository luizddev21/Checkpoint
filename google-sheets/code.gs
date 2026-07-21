const URL = "https://SEU_LINK.netlify.app/.netlify/functions/getRecords";
const ADMIN_KEY = "SUA_ADMIN_KEY"

function atualizarRegistros() {

  const response = UrlFetchApp.fetch(URL, {
    method: "get",
    headers: {
      Authorization: ADMIN_KEY
    }
  });

  const registros = JSON.parse(response.getContentText());

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.clear();

  let checkin = 0;
  let confirmados = 0;
  let checkout = 0;

  registros.forEach(r => {
    if (r.nivel_verificacao == 1) checkin++;
    if (r.nivel_verificacao == 2) confirmados++;
    if (r.nivel_verificacao == 3) checkout++;
  });

  sheet.getRange("B1:E1").merge();
  sheet.getRange("B1").setValue("CONTROLE DE PRESENÇA");
  sheet.getRange("B1")
    .setBackground("#698fce")
    .setFontColor("white")
    .setFontWeight("bold")
    .setFontSize(18)
    .setHorizontalAlignment("center");

  sheet.getRange("B2").setValue(
    "Última atualização: " +
    Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "dd/MM/yyyy HH:mm:ss"
    )
  );

  sheet.getRange("B2:E3")
    .setBorder(true, true, true, true, true, true);

  sheet.getRange("B3").setValue("👥 Total");
  sheet.getRange("C3").setValue("🟡 Check-in");
  sheet.getRange("D3").setValue("🟢 Confirmados");
  sheet.getRange("E3").setValue("🔴 Check-out");

  sheet.getRange("B4").setValue(registros.length);
  sheet.getRange("C4").setValue(checkin);
  sheet.getRange("D4").setValue(confirmados);
  sheet.getRange("E4").setValue(checkout);

  sheet.getRange("B3:E3")
    .setBackground("#698fce")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  sheet.getRange("B4:E4")
    .setFontWeight("bold")
    .setFontSize(14)
    .setHorizontalAlignment("center");

  sheet.getRange("B3:E4")
    .setBorder(true, true, true, true, true, true);

  sheet.getRange("B6:C6").setValues([[
    "Nome",
    "Status"
  ]]);

  sheet.getRange("B6:C6")
    .setBackground("#1976D2")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  let linha = 7;

  registros.forEach(r => {

    let status = "";

    switch (r.nivel_verificacao) {

      case 1:
        status = "🟡 Check-in";
        break;

      case 2:
        status = "🟢 Confirmado";
        break;

      case 3:
        status = "🔴 Check-out";
        break;

      default:
        status = "⚪ Desconhecido";

    }

    sheet.getRange(linha, 2, 1, 2).setValues([[
      r.nome,
      status
    ]]);

    linha++;

  });

  if (linha > 7) {

    sheet.getRange(6, 2, linha - 6, 2)
      .setBorder(true, true, true, true, true, true);

    sheet.getRange(6, 2, linha - 6, 2)
      .applyRowBanding();

  }

  sheet.setFrozenRows(6);

  sheet.setColumnWidth(2, 350);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 150);
  sheet.setColumnWidth(5, 150);

  sheet.getRange("B:E").setFontFamily("Arial");

  for (let i = 7; i <= sheet.getLastRow(); i++) {

    const cell = sheet.getRange(i, 3);
    const value = cell.getValue();

    if (value.includes("🟡")) {
      cell.setBackground("#FFF59D");
    }

    if (value.includes("🟢")) {
      cell.setBackground("#A5D6A7");
    }

    if (value.includes("🔴")) {
      cell.setBackground("#EF9A9A");
    }

  }

}

function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("Controle")
    .addItem("Atualizar registros", "atualizarRegistros")
    .addToUi();

}