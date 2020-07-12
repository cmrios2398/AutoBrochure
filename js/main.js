import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

// import {generateWordDocument} from "./documentCreate.js"


function searcher(){
        
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

    generateWordDocument();

}

// function getFiles(){

 

//     document.getElementById('csvFiles').addEventListener('change', function (e) {
//       var files = e.target.files;
//       //proceed your files here
//       reader.readAsText(files[0]);
//     }, false);

//     const csvFilePath = 'person.csv'
// const csv = require('csvtojson');
// (async () => {
//   const jsonObj = await csv().fromFile(csvFilePath)
//   console.log(jsonObj);
// })();
//     // var x = document.getElementById("csvFiles");
//     console.log("File: " + reader.readAsText(files[0]));

//     if(x.value!=""){
//         x.disabled = true;
//     }

//   }
