// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')


function createWindow() {
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
const {
  each
} = require('jquery')
const { stringify } = require('querystring')
// const { TitleStyle } = require('docx/build/file/styles/style')

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function() {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.

      if (BrowserWindow.getAllWindows().length === 0) createWindow()
      
  })
})



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
  localStorage.clear();

  mainWindow.removeAllListeners('close');
  mainWindow.close();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// import { Document, Packer } from "docx";
// import { saveAs } from "file-saver";



function saveDocumentToFile(doc, fileName) {
  var fs = require("fs");
  var Packer = require("docx").Packer;
  var saveAs = require("file-saver").saveAs;
  let packer = new Packer();
  const mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  //gives user the option to select where to save the document
  Packer.toBlob(doc).then(blob => {
      const docblob = blob.slice(0, blob.size, mimeType);
      saveAs(docblob, fileName);
  });


}

function generateWordDocument(fieldList, keywords, brochureData) {
  var Document = require("docx").Document;
  var Paragraph = require("docx").Paragraph;
  var TextRun = require("docx").TextRun;
  var HeadingLevel = require("docx").HeadingLevel;
  var Styles = require("docx").Styles;

  // const myStyles = new docx.Styles();

  // The first argument is an ID you use to apply the style to paragraphs
  // The second argument is a human-friendly name to show in the UI
  // myStyles.createParagraphStyle('body', 'General Body Style')
  // .basedOn('Normal')
  // .next('Normal')
  // .color('999999')
  // .italics()
  // .indent(720)  // 720 TWIP === 720 / 20 pt === .5 in
  // .spacing({line: 276});  // 276 / 240 = 1.15x line spacing

  // myStyles.createParagraphStyle('headingAbstract', 'Heading for Abstracts')
  // .basedOn("Normal")
  // .next("Normal")
  // .quickFormat()
  // .size(26)  // 26 half-points === 13pt font
  // .bold()
  // .underline('double', 'FF0000')
  // .spacing({before: 240, after: 120});  // TWIP for both


 
  var brochureData = JSON.parse(localStorage.getItem("brochureData"))
  var keys = JSON.parse(localStorage.getItem("keys"));


  let doc = new Document({
      creator: "IBM",
      description: "Autobrochure generated for abstracts that match the given search.",
      title: "Autobrochure"
  });


  var projectsFound = [];
  brochureData.forEach(element => {
      projectsFound.push(


          new Paragraph({
              text: element[keys[0]],
              heading: HeadingLevel.HEADING_1,
          }),

          // new Paragraph("Some simple content"),
          new Paragraph({
              text: "Authors: " + element[keys[1]],
              heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
              text: "Client: " + element[keys[4]],
              heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
              text: "Internal Supervisor: " + element[keys[3]],
              heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: "Module Code: " + element[keys[2]],
            heading: HeadingLevel.HEADING_2,
        }),
          new Paragraph({
              text: "Technologies Used: " + element[keys[6]],
              heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
              text: "Abstract: " + element[keys[8]],
              heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: "GitHub Repository: " + element[keys[9]],
            heading: HeadingLevel.HEADING_2,
        }),
          new Paragraph({
              text: " ",
              heading: HeadingLevel.HEADING_2,
              thematicBreak: true
          }),



      )
  })


  doc.addSection({
      children: projectsFound
  })




  saveDocumentToFile(doc, "autobrochure.docx");
}



function contains(target, pattern) {
  var value = 0;
  pattern.forEach(function(word) {
      value = value + target.includes(word);
  });
  return (value === 1)
}


function searcher() {

  
  //required for fuzzy search
  // const Fuse = require("fuse.js");

  //gets data from file input
  var jsonAllData = JSON.parse(localStorage.getItem("jsonAllData"));

  var fieldList = [];
  
  var field_1 = document.getElementById("searchfield-1");
  if (field_1.options[field_1.selectedIndex].text != "Module Code") fieldList.push(field_1.options[field_1.selectedIndex].text.toLowerCase());

  var field_2 = document.getElementById("searchfield-2");
  if (field_2.options[field_2.selectedIndex].text != "Academic Supervisor") fieldList.push(field_2.options[field_2.selectedIndex].text.toLowerCase());

  var field_3 = document.getElementById("searchfield-3");
  if (field_3.options[field_3.selectedIndex].text != "Project Author") fieldList.push(field_3.options[field_3.selectedIndex].text.toLowerCase());

  var field_4 = document.getElementById("searchfield-4");
  if (field_4.options[field_4.selectedIndex].text != "Client Name") fieldList.push(field_4.options[field_4.selectedIndex].text.toLowerCase());

  var field_5 = document.getElementById("searchfield-5");
  if (field_5.options[field_5.selectedIndex].text != "Technologies Used") fieldList.push(field_5.options[field_5.selectedIndex].text.toLowerCase());

  var field_6 = document.getElementById("searchfield-6");
  if (field_6.options[field_6.selectedIndex].text != "Field Area") fieldList.push(field_6.options[field_6.selectedIndex].text.toLowerCase());

  var keywords_string = document.getElementById("input").value.toLowerCase();
  
  var keywords = keywords_string.split(",");

  
  var cleanedKeywords = [];

  keywords.forEach(element => {
    if(element!=""){
      if(element!=" "){
        cleanedKeywords.push(element.toLowerCase().trim())
        console.log(element.toLowerCase().trim())
      }
    }
  });


  var allKeywords = cleanedKeywords.concat(fieldList);

  keys = JSON.parse(localStorage.getItem("keys"))
  var brochureData = [];

  console.log(allKeywords)


  //You are starting with the search algorithm going through every database field (project, author...) of each
  //element and checking whether it contains either the keyword or the fieldList
  //
  //the problem that you are having is that you get an error when it encounters an empty field (try catch??)


  // SIMPLE SEARCH:
  var title, authors, moduleCode, supervisorName, clientName, clientOrganisation, technologiesUsed;
  jsonAllData.forEach(element => {


    try{

     title = element[keys[0]].toLowerCase()
    }
    catch(e){title = ""}
     
    try{
     authors = element[keys[1]].toLowerCase()
    }
    catch(e){authors = ""}

    try{
     moduleCode = element[keys[2]].toLowerCase()
    }
    catch(e){moduleCode = ""}

    try{
     supervisorName = element[keys[3]].toLowerCase()
    }
    catch(e){supervisorName = ""}

    try{
     clientName = element[keys[4]].toLowerCase()
    }
    catch(e){clientName = ""}

    try{
     clientOrganisation = element[keys[5]].toLowerCase()
    }
    catch(e){clientOrganisation = ""}

    try{
     technologiesUsed = element[keys[6]].toLowerCase()
    }
    catch(e){technologiesUsed = ""}

  

    // console.log(moduleCode)
    // console.log(allKeywords)

    if (
    (contains(title, allKeywords)) || 
    (contains(authors, allKeywords)) || 
    (contains(moduleCode, allKeywords)) || 
    (contains(supervisorName, allKeywords)) || 
    (contains(clientName, allKeywords)) || 
    (contains(clientOrganisation, allKeywords)) || 
    (contains(technologiesUsed, allKeywords)) 
    ){
      brochureData.push(element);
    }
  });

  localStorage.setItem("brochureData",JSON.stringify(brochureData));

  var nResults = document.getElementById("noOfResults");
  nResults.innerHTML = brochureData.length + " results";
  // var number = document.createTextNode(brochureData.length);
  // nResults.appendChild(number);

  console.log(brochureData)

  // generateWordDocument(fieldList, keywords, brochureData);



}

// used to extract uncommon words/keywords from title
function getNoneStopWords(sentence) {
  var common = getStopWords();
  var wordArr = sentence.match(/\w+/g),
      commonObj = {},
      uncommonArr = [],
      word, i, wordLower;

  for (i = 0; i < common.length; i++) {
      commonObj[ common[i].trim() ] = true;
  }

  for (i = 0; i < wordArr.length; i++) {
      wordLower = wordArr[i].trim().toLowerCase();
      word = wordArr[i].trim()
      if (!commonObj[wordLower]) {
          uncommonArr.push(word);
      }
  }
  return uncommonArr;
}

function getStopWords() {
  return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function remove_duplicates(arr) {
  var obj = {};
  var ret_arr = [];
  for (var i = 0; i < arr.length; i++) {
      // arr[i] = arr[i].charAt(0) + arr[i].substring(1).toLowerCase();
      obj[arr[i]] = true;
  }
  for (var key in obj) {
      ret_arr.push(key);
  }

  let result = [];
  
     const duplicates = new Set();
     for(const string of ret_arr) {
        if(!duplicates.has(string.toLowerCase())){
          duplicates.add(string.toLowerCase());
          result.push(string)
        }
     }
  return   result
  ;
}

//gets files and adds converst them to JSON 
function getFiles() {

  
  var x = document.getElementById("csvFiles");

  if (x.value != "") {
      x.disabled = true;
  }


  var jsonAllData = {};
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

      var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var output = XLSX.utils.sheet_to_json(worksheet, {
          raw: true
      })
      localStorage.setItem('jsonAllData', JSON.stringify(output));


  }
  oReq.send();

  jsonAllData = JSON.parse(localStorage.getItem('jsonAllData'));

  var keys = []
 
    Object.keys(jsonAllData[0]).forEach(function(subKey){
      keys.push(subKey);
    })
    // ...


    localStorage.setItem("keys",JSON.stringify(keys));
    //TITLES LIST
  var titlesList = []

  jsonAllData.forEach(element => {
      titlesList.push(element[keys[0]].trim())
      
  })
  

  titlesList.sort();
  localStorage.setItem("titlesList",JSON.stringify(titlesList));


  var keywordTitles = []
  titlesList.forEach(element => {
    getNoneStopWords(element).forEach( subElement => {
      keywordTitles.push(toTitleCase(subElement));
    })
  });
  


  //MODULE LIST:
  var moduleCodes = []
  var jsonAllData = JSON.parse(localStorage.getItem("jsonAllData"));

  jsonAllData.forEach(element => {
      // element[keys[2]] = element[keys[2]].split(" ");

      if (!moduleCodes.includes(element[keys[2]].toUpperCase().trim())) {
          moduleCodes.push(element[keys[2]].toUpperCase().trim())
      }
  })

  moduleCodes.forEach(element => {
      moduleCodes.forEach(subElement => {
          if (subElement.length > element.length && subElement.includes(element)) {
              moduleCodes.pop(subElement)
          }
      })
  })
  localStorage.setItem("moduleCodes",JSON.stringify(moduleCodes));







  


  //UCL ACADEMIC SUPERVISOR LIST:
  var tempSupervisorList = []
  var supervisorList = []

  jsonAllData.forEach(element => {
    try{ //stops the program from crashing if data is missing
      if (element[keys[3]].includes(",")) {
          element[keys[3]].split(",").forEach(subElement => {
            if(subElement != ""){
              tempSupervisorList.push(subElement.trim().replace(".", ""));
            }
          })
        }
      }
    catch(e){}
  })
  

  tempSupervisorList.forEach(element => {
      if (!supervisorList.includes(element)) {
          supervisorList.push(element);
      }
  })

  supervisorList.sort();
  localStorage.setItem("supervisorList",JSON.stringify(supervisorList));



  //PROJECT AUTHORS LIST:
  var tempAuthorsList = []
  var authorsList = []

  
  jsonAllData.forEach(element => {
    try { //stops the program from crashing if data is missing
      if (element[keys[1]].includes(",")) {
          element[keys[1]].split(",").forEach(subElement => {
            if(subElement != ""){
              tempAuthorsList.push(subElement.trim().replace(".", ""));
            }
          })
      }
    }
    catch (e){}
  })

  tempAuthorsList.forEach(element => {
      if (!authorsList.includes(element)) {
          authorsList.push(element);
      }
  })

  authorsList.sort()
  localStorage.setItem("authorsList",JSON.stringify(authorsList));



  //CLIENT NAME LIST:
  var tempClientList = []
  var clientList = []

  
  jsonAllData.forEach(element => {
    try { //stops the program from crashing if data is missing
      if (element[keys[4]].includes(",")) {
          element[keys[4]].split(",").forEach(subElement => {
            if(subElement != ""){
              tempClientList.push(subElement.trim().replace(".", ""));
            }
          })
      }
    }
    catch (e){}
  })

  tempClientList.forEach(element => {
      if (!clientList.includes(element)) {
          clientList.push(element);
      }
  })

  clientList.sort()
  localStorage.setItem("clientList",JSON.stringify(clientList));



  //TECHNOLOGIES USED LIST:
  var tempTechList = []
  var techList = []

  
  jsonAllData.forEach(element => {
    try { //stops the program from crashing if data is missing
      if (element[keys[6]].includes(",")) {
          element[keys[6]].split(",").forEach(subElement => {
            if(subElement != ""){
              tempTechList.push(subElement.trim().replace(".", ""));
            }
          })
      }
    }
    catch (e){}
  })

  tempTechList.forEach(element => {
      if (!techList.includes(element)) {
          techList.push(element);
      }
  })

  techList.sort()
  localStorage.setItem("techList",JSON.stringify(techList));

  //TECHNOLOGIES USED LIST:
  var tempFieldAreasList = []
  var fieldAreasList = []

  
  jsonAllData.forEach(element => {
    try { //stops the program from crashing if data is missing
      if (element[keys[7]].includes(",")) {
          element[keys[7]].split(",").forEach(subElement => {
            if(subElement != ""){
              tempFieldAreasList.push(subElement.trim().replace(".", ""));
            }
          })
      }
    }
    catch (e){}
  })

  tempFieldAreasList.forEach(element => {
      if (!fieldAreasList.includes(element)) {
          fieldAreasList.push(element);
      }
  })

  fieldAreasList.sort()
  localStorage.setItem("fieldAreasList",JSON.stringify(fieldAreasList));



  var fullKeywordList = techList.concat(clientList,authorsList,supervisorList,moduleCodes,fieldAreasList,keywordTitles)

  fullKeywordList = remove_duplicates(fullKeywordList);

  //SEARCHBAR

  new Awesomplete('input[data-multiple]', {
    filter: function(text, input) {
      return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
    },
  
    item: function(text, input) {
      return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
    },
  
    replace: function(text) {
      var before = this.input.value.match(/^.+,\s*|/)[0];
      this.input.value = before + text + ", ";
    },

    list: fullKeywordList
  }) 

  




}
