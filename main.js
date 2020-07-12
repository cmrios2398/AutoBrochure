// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const electron = require('electron')

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// import { Document, Packer } from "docx";
// import { saveAs } from "file-saver";




function saveDocumentToFile(doc, fileName){
  var fs = require("fs");
  var Packer = require("docx").Packer;
  var saveAs = require("file-saver").saveAs;
  let packer = new Packer();
  const mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  //gives user the option to select where to save the document
  Packer.toBlob(doc).then(blob => {
    const docblob = blob.slice(0, blob.size, mimeType);
    saveAs(docblob,fileName );
});
  

}

function generateWordDocument(fieldList, keywords, brochureData){
  var Document = require("docx").Document;
  var Paragraph = require("docx").Paragraph;
  var TextRun = require("docx").TextRun;

  let doc = new Document({
    creator: "IBM",
    description: "Autobrochure generated for abstracts that match the given search.",
    title: "Autobrochure"
  });

  doc.addSection({
    children: [
        new Paragraph({
            children: [new TextRun("AUTOBROCHURE GENERATED TEXT")],
        }),
    ],
});

saveDocumentToFile(doc, "autobrochure.docx");
}

function searcher(){

  //gets data from file input
  var jsonAllData = getFiles();
  console.log(jsonAllData);

  var field_1 = document.getElementById("searchfield-1");
  var fieldname_1 = field_1.options[field_1.selectedIndex].text;

  var field_2 = document.getElementById("searchfield-2");
  var fieldname_2 = field_2.options[field_2.selectedIndex].text;

  var field_3 = document.getElementById("searchfield-3");
  var fieldname_3 = field_3.options[field_3.selectedIndex].text;

  var field_4 = document.getElementById("searchfield-4");
  var fieldname_4 = field_4.options[field_4.selectedIndex].text;

  var field_5 = document.getElementById("searchfield-5");
  var fieldname_5 = field_5.options[field_5.selectedIndex].text;

  var field_6 = document.getElementById("searchfield-6");
  var fieldname_6 = field_6.options[field_6.selectedIndex].text;

  var keywords = document.getElementById("search").value;

  var fieldList = {
      field_1 : fieldname_1,
      field_2 : fieldname_2,
      field_3 : fieldname_3,
      field_4 : fieldname_4,
      field_5 : fieldname_5,
      field_6 : fieldname_6,
      
  }

  console.log(fieldList);
  console.log(keywords);

  var jsonQuery = require('json-query');

  var data = {
    people: [
      {name: 'Matt', country: 'NZ'},
      {name: 'Pete', country: 'AU'},
      {name: 'Mikey', country: 'NZ'}
    ]
  }

  console.log(data);
   
  jsonQuery('people[country=NZ].name', {
    data: jsonAllData
  }) //=> {value: 'Matt', parents: [...], key: 0} ... etc


  generateWordDocument(fieldList,keywords,brochureData);

  

}


//gets files and adds converst them to JSON 
function getFiles(){ 
  var x = document.getElementById("csvFiles");
  console.log("File: " + x.files[0].path);

  if(x.value!=""){
      x.disabled = true;
  }


  var jsonAllData;
  var XLSX = require("xlsx");

  var url = x.files[0].path;
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      /* Call XLSX */
      var workbook = XLSX.read(bstr, {
          type: "binary"
      });

      /* DO SOMETHING WITH workbook HERE */
      var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var output = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
    })
      jsonAllData = output;
      console.log(output);
  }
  oReq.send();

  return jsonAllData;





}





// import { Document, Packer, Paragraph, TextRun } from "docx";
// import { saveAs } from "file-saver";

// import {generateWordDocument} from "./documentCreate.js"



// module.exports = generateWordDocument;