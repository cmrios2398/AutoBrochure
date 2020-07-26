
// The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
function replaceErrors(key, value) {
    if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
            error[key] = value[key];
            return error;
        }, {});
    }
    return value;
}

function errorHandler(error
    ) {
    console.log(JSON.stringify({error: error}, replaceErrors));

    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function (error) {
            return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
    }
    throw error;
}




//ALTERNATE SOLUTION:

// function generateWordDocument(fieldList, keywords, brochureData) {
    // var Document = require("docx").Document;
//     var Paragraph = require("docx").Paragraph;
//     var TextRun = require("docx").TextRun;
//     var HeadingLevel = require("docx").HeadingLevel;
//     var Styles = require("docx").Styles;
  
//     // const myStyles = new docx.Styles();
  
//     // The first argument is an ID you use to apply the style to paragraphs
//     // The second argument is a human-friendly name to show in the UI
//     // myStyles.createParagraphStyle('body', 'General Body Style')
//     // .basedOn('Normal')
//     // .next('Normal')
//     // .color('999999')
//     // .italics()
//     // .indent(720)  // 720 TWIP === 720 / 20 pt === .5 in
//     // .spacing({line: 276});  // 276 / 240 = 1.15x line spacing
  
//     // myStyles.createParagraphStyle('headingAbstract', 'Heading for Abstracts')
//     // .basedOn("Normal")
//     // .next("Normal")
//     // .quickFormat()
//     // .size(26)  // 26 half-points === 13pt font
//     // .bold()
//     // .underline('double', 'FF0000')
//     // .spacing({before: 240, after: 120});  // TWIP for both
  
  
   
//     var brochureData = JSON.parse(localStorage.getItem("brochureData"))
//     var keys = JSON.parse(localStorage.getItem("keys"));
  
  
//     let doc = new Document({
//         creator: "IBM",
//         description: "Autobrochure generated for abstracts that match the given search.",
//         title: "Autobrochure"
//     });
  
  
//     var projectsFound = [];
//     brochureData.forEach(element => {
//         projectsFound.push(
  
  
//             new Paragraph({
//                 text: element[keys[0]],
//                 heading: HeadingLevel.HEADING_1,
//             }),
  
//             // new Paragraph("Some simple content"),
//             new Paragraph({
//                 text: "Authors: " + element[keys[1]],
//                 heading: HeadingLevel.HEADING_2,
//             }),
//             new Paragraph({
//                 text: "Client: " + element[keys[4]],
//                 heading: HeadingLevel.HEADING_2,
//             }),
//             new Paragraph({
//                 text: "Internal Supervisor: " + element[keys[3]],
//                 heading: HeadingLevel.HEADING_2,
//             }),
//             new Paragraph({
//               text: "Module Code: " + element[keys[2]],
//               heading: HeadingLevel.HEADING_2,
//           }),
//             new Paragraph({
//                 text: "Technologies Used: " + element[keys[6]],
//                 heading: HeadingLevel.HEADING_2,
//             }),
//             new Paragraph({
//                 text: "Abstract: " + element[keys[8]],
//                 heading: HeadingLevel.HEADING_2,
//             }),
//             new Paragraph({
//               text: "GitHub Repository: " + element[keys[9]],
//               heading: HeadingLevel.HEADING_2,
//           }),
//             new Paragraph({
//                 text: " ",
//                 heading: HeadingLevel.HEADING_2,
//                 thematicBreak: true
//             }),
  
  
  
//         )
//     })
  
  
//     doc.addSection({
//         children: projectsFound
//     })
  
  
  
  
//     saveDocumentToFile(doc, "autobrochure.docx");
//   }
  
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