function doGet(e) {
    Logger.log(JSON.stringify(e));
    var result = "OK";
    if (e.parameter == "undefined") {
        result = "Please provide parameters";
    }
    else {
        var sheet_id = "1AujGv9pSkvQElwHLll9JEkuBMmMjawunu3OzPsRApU4"; // Spreadsheet ID
        var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();
        var newRow = sheet.getLastRow() + 1;
        var rowData = [];
        var Curr_Date = new Date();
        rowData[1] = Curr_Date; // Date in column B
        var Curr_Time = Utilities.formatDate(Curr_Date, "Asia/Manila", "HH:mm:ss");
        // Timezone List https://gist.github.com/mhawksey/8673e904a03a91750c26c2754fe0977a#file-appsscriptzoneids-csv
        rowData[2] = Curr_Time; // Time in column C
        result = "Event add successful!";
        for (var param in e.parameter) {
            Logger.log("In for loop, param=" + param);
            var value = stripQuotes(e.parameter[param]);
            Logger.log(param + ":" + e.parameter[param]);
            switch (param) {
                case "level":
                    rowData[0] = value; // Level in column A
                    break;
                case "source":
                    rowData[3] = value; // Source in column D
                    break;
                case "eventid":
                    rowData[4] = value; // Event ID in column E
                    break;
                case "eventdata":
                    rowData[5] = value; // Event Data in column F
                    break;
                default:
                    result = "unsupported parameter";
            }
        }
        Logger.log(JSON.stringify(rowData));
        var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
        newRange.setValues([rowData]);
    }
    return ContentService.createTextOutput(result);
}

function stripQuotes(value) {
    return value.replace(/^["']|['"]$/g, "");
}