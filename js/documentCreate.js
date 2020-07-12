import { Document, Packer } from "docx";
import { saveAs } from "file-saver";

var generateWordDocument = function(){
    let doc = new Document();

    doc.theme = {
        font: {
          normal: {
            family: "Calibri",
            color: "303856"
          },
          header: { family: "Calibri Light" }
        },
        title: {
          color: "4ABDAC"
        },
        headings: {
          one: {
            color: "FC4A1A"
          },
          two: {
            color: "F7B733"
          }
        }
      };
      doc.Styles.createParagraphStyle("customHeading1", "Custom Heading 1")
        .basedOn("Heading 1")
        .next("Normal")
        .quickFormat()
        .font(doc.theme.font.header.family)
        .size(32)
        .bold()
        .color(doc.theme.headings.one.color)
        .spacing({ after: 250 });
      doc.Styles.createParagraphStyle("customHeading2", "Custom Heading 2")
        .basedOn("Heading 2")
        .next("Normal")
        .quickFormat()
        .font(doc.theme.font.header.family)
        .size(26)
        .bold()
        .color(doc.theme.headings.two.color)
        .spacing({ after: 150 });
      doc.Styles.createParagraphStyle("customTitle", "Custom Title")
        .basedOn("Title")
        .next("Normal")
        .quickFormat()
        .font(doc.theme.font.header.family)
        .size(56)
        .bold()
        .color(doc.theme.font.normal.color)
        .spacing({ after: 250 });
      doc.Styles.createParagraphStyle("customSubtitle", "Custom Subtitle")
        .basedOn("Subtitle")
        .next("Normal")
        .quickFormat()
        .font(doc.theme.font.header.family)
        .size(22)
        .color(doc.theme.font.normal.color)
        .spacing({ after: 150 });
      doc.Styles.createParagraphStyle("customNormal", "Custom Normal")
        .basedOn("Normal")
        .quickFormat()
        .font(doc.theme.font.normal.family)
        .size(20)
        .color(doc.theme.font.normal.color)
        .spacing({ after: 150 });
      doc.createParagraph("Title").style("customTitle");
      doc.createParagraph("Subtitle").style("customSubtitle");
      doc.createParagraph("Heading 1").style("customHeading1");
      doc.createParagraph("Heading 2").style("customHeading2");
      doc
        .createParagraph(
          "Aliquam gravida quam sapien, quis dapibus eros malesuada vel. Praesent tempor aliquam iaculis. Nam ut neque ex. Curabitur pretium laoreet nunc, ut ornare augue aliquet sed. Pellentesque laoreet sem risus. Cras sodales libero convallis, convallis ex sed, ultrices neque. Sed quis ullamcorper mi. Ut a leo consectetur, scelerisque nibh sit amet, egestas mauris. Donec augue sapien, vestibulum in urna et, cursus feugiat enim. Ut sit amet placerat quam, id tincidunt nulla. Cras et lorem nibh. Suspendisse posuere orci nec ligula mattis vestibulum. Suspendisse in vestibulum urna, non imperdiet enim. Vestibulum vel dolor eget neque iaculis ultrices."
        )
        .style("customNormal");
      // Call saveDocumentToFile with the document instance and a filename
    saveDocumentToFile(doc, "autobrochure.docx");
}

var saveDocumentToFile = function(doc, fileName){
    const packer = new Packer();
    const mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    packer.toBlob(doc).then(blob => {
        const docblob = blob.slice(0,blob.size, mimeType)
        saveAs(docblob, fileName)
    })

}

module.exports = generateWordDocument;