
$("#submitButton" ).click(function() {
  



if($("#csvFiles").val()!=""){
  $("#advance-search").show();
}

var myOpts1 = document.getElementById('searchfield-1').options;
console.log(myOpts1.length)
var myOpts2 = document.getElementById('searchfield-2').options;
var myOpts3 = document.getElementById('searchfield-3').options;
var myOpts4 = document.getElementById('searchfield-4').options;
var myOpts5 = document.getElementById('searchfield-5').options;
var myOpts6 = document.getElementById('searchfield-6').options;


if (!(myOpts1.length > 1 || myOpts2.length > 1 || myOpts3.length > 1 || myOpts4.length > 1 || myOpts5.length > 1 || myOpts6.length > 1)){

  //MODULE CODES 
var moduleCodes = JSON.parse(localStorage.getItem("moduleCodes"));
moduleCodes.forEach(element => {
  $('#searchfield-1').append($('<option>', {
    value: element,
    text: element
  }));
});


//SUPERVISORS
var supervisorList = JSON.parse(localStorage.getItem("supervisorList"));
supervisorList.forEach(element => {
  $('#searchfield-2').append($('<option>', {
    value: element,
    text: element
  }));
  
});

//PROJECT AUTHORS
var authorsList = JSON.parse(localStorage.getItem("authorsList"));
authorsList.forEach(element => {
  $('#searchfield-3').append($('<option>', {
    value: element,
    text: element
  }));
  
});

//CLIENT NAMES
var clientList = JSON.parse(localStorage.getItem("clientList"));
clientList.forEach(element => {
  $('#searchfield-4').append($('<option>', {
    value: element,
    text: element
  }));
  
});

//TECHNOLOGIES
var techList = JSON.parse(localStorage.getItem("techList"));

techList.forEach(element => {
  $('#searchfield-5').append($('<option>', {
    value: element,
    text: element
  }));
  
});

//FIELD AREAS
var fieldAreasList = JSON.parse(localStorage.getItem("fieldAreasList"));
fieldAreasList.forEach(element => {
  $('#searchfield-6').append($('<option>', {
    value: element,
    text: element
  }));
  
});

}


});

$("#search_button").click(function() {
  
  $("#docreate").show();
  
});


$(document).ready(function() { 
  $('input[type="file"]').change(function() { 
    var x = document.getElementById("csvFiles");
    // console.log("File: " + x.files[0].path);
    
    if (x.value != "") {
      x.disabled = true;
    }
    
    
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
      // jsonAllData = output;
      // console.log("data: " + output);
      localStorage.setItem('jsonAllData', JSON.stringify(output));
      
      // return jsonAllData;
      
    }
    oReq.send();  }); 
}); 


