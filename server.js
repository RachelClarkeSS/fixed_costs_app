const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require("body-parser");
var path = require("path");
const e = require('express');
const port = 8080;
app.use(bodyParser.urlencoded({extended: true}));

var html1 = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta 
http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" 
content="width=device-width, initial-scale=1.0"><title>CPR Fixed Costs Assistant</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet">
<style> h4{margin-top: 10%;} .topnav a {float: left;color: #f2f2f2;text-align: center;
padding: 24px 5%; 
text-decoration: none;font-size: 17px;} body{text-align: center;}u {text-decoration: none;
border: 1px solid black;}​</style></head>
<body>
<div class="topnav">
  <a href="/" onclick='showHome();' style="width: 100%; background-color: white; 
  font-family: Arial, Helvetica, sans-serif; color: black;"><h3>
      <u><b>SEASONED SYSTEMS</b></u></h3><h5>Fixed Costs Tool</h5></a>
</div>
<div id="resultsPDF">`;

var html2 = `</div><br><br>
<div id="buttons"><button type="button" onclick="history.back(-1)" 
class="btn btn-primary" style="width: 48%; height: 5%; text-align: center; margin-bottom: 2%; 
margin-right: 4%;"><h5><b>Back</b></h5></button><button type="button" onclick="createPDF()" 
class="btn btn-danger" style="width: 48%; height: 5%; text-align: center; margin-bottom: 2%;">
<h5 style="color: white;"><b>PDF</b> <i class="fa fa-file-pdf-o"></i><b></h5></button></div></div>
<br><br><div id="disclaimer"><h6 style="margin-left: 11%; margin-right: 11%; text-align: justify;
text-justify: inter-word;">Seasoned Systems Limited does not accept any liability whatsoever  
for any reliance placed on the above results. It is strongly recommended to carry out
independent research/calculations and not rely on this tool as your sole reference point</h6></div>`;

var html6 = `</div><br><br>
<div id="buttons"><button type="button" onclick="history.back(-1)" 
class="btn btn-primary" style="width: 38%; height: 5%; text-align: center; margin-bottom: 2%; 
margin-right: 4%;margin-left:10%;"><h5><b>Back</b></h5></button><button type="button" onclick="createPDF()" 
class="btn btn-danger" style="width: 38%; height: 5%; text-align: center; margin-bottom: 2%; margin-right: 10%;;">
<h5 style="color: white;"><b>PDF</b> <i class="fa fa-file-pdf-o"></i><b></h5></button></div></div>
<br><br><div id="disclaimer"><h6 style="margin-left: 11%; margin-right: 11%; text-align: justify;
text-justify: inter-word;">Seasoned Systems Limited does not accept any liability whatsoever  
for any reliance placed on the above results. It is strongly recommended to carry out
independent research/calculations and not rely on this tool as your sole reference point</h6></div>`;

var html3 = `<script>function goBack() {window.history.back();}
            

function createPDF() {
    
    sTable = document.getElementById('resultsPDF').innerHTML;
    showAfter = document.getElementById('showafter').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 14px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "body{text-align: center;}";
    style = style + "#buttons{display: none;}";
    style = style + "#disclaimer{margin-top: -12%;}";
    style = style + "</style>";
    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Fixed Costs Results</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<h1 style="font-family: arial;">SEASONED SYSTEMS</h1>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write(showAfter);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write(lastpara);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
    win.document.close();   // CLOSE THE CURRENT WINDOW.
    win.print();    // PRINT THE CONTENTS.
}
</script></body></html>`;

var html5 = `</div><br><br>
<div id="buttons"><button type="button" onclick="history.back(-1)" 
class="btn btn-primary" style="width: 40%; height: 5%; text-align: center; margin-bottom: 2%; 
margin-right: 10%; margin-left: 10%"><h5><b>Back</b></h5></button>
</div></div>
<br><br><div id="disclaimer"><h6 style="margin-left: 11%; margin-right: 11%; text-align: justify;
text-justify: inter-word;">Seasoned Systems Limited does not accept any liability whatsoever  
for any reliance placed on the above results. It is strongly recommended to carry out
independent research/calculations and not rely on this tool as your sole reference point</h6></div>`;

var links = "";


function reformatDate(dateStr){
  dArr = dateStr.split("-");  // ex input "2010-01-18"
  return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
}

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  });

app.get('/main-image',function(req,res){
    res.sendFile(path.join(__dirname+'/rcj.jpg'));
  });

app.get('/substantive',function(req,res){
    res.sendFile(path.join(__dirname+'/substantive.html'));
  });

app.get('/applications',function(req,res){
    res.sendFile(path.join(__dirname+'/applications.html'));
  });

app.get('/counterclaims',function(req,res){
    res.sendFile(path.join(__dirname+'/counterclaims.html'));
  });

app.get('/money',function(req,res){
    res.sendFile(path.join(__dirname+'/money.html'));
  });

app.get('/land',function(req,res){
    res.sendFile(path.join(__dirname+'/land.html'));
  });

app.get('/enforcement',function(req,res){
    res.sendFile(path.join(__dirname+'/enforcement.html'));
  });

app.get('/hmrc',function(req,res){
    res.sendFile(path.join(__dirname+'/hmrc.html'));
  });

app.get('/fasttrack',function(req,res){
    res.sendFile(path.join(__dirname+'/fasttrack.html'));
  });

app.get('/ip',function(req,res){
    res.sendFile(path.join(__dirname+'/ip.html'));
  });

app.get('/aarhus',function(req,res){
    res.sendFile(path.join(__dirname+'/aarhus.html'));
  });

app.post('/showSubstantive',function(req,res){
  var results = '';
  var amounttotal = 0;
  var vattotal = 0;
  var linetotal1 = 0;
  var linetotal2 = 0;
  var linetotal3 = 0;
  var linetotal4 = 0;
  var linetotal5 = 0;
  var grandtotal = 0;
  var indisease = false;
  console.log(req.body);

  var results = "<table class='table table-striped table-light'><tr><th style='width: 30%'><p><b>"+
                "Item</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Amount</b></p></th>"+
                "<th class='thead-dark' style='width: 20%'><p>"+
                "<b>VAT</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Total</b></p></th>";

   if (req.body.damages >=25000 && req.body.moj =='non-portal'){
       results = '<h4 style="text-align: justify; text-justify: inter-word; margin-left: 10%; margin-right: 10%;">The Claim for Costs should escape Fixed Costs as it was never submitted to the Portal and'+ ' '+
       'the level of damages are commensurate with Multi Track claims';

   }else if (req.body.pi == 'no'){
     console.log('working');
     results += `<tr><td><h6>Item</h6></td><td><h6>£250.00</h6></td><td><h6>£50.00</h6></td><td><h6>£300.00</h6></td></tr>`+
     `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£250.00<b></h6></td><td><h6><b>£50.00<b></h6></td>`+
     `<td><h6><b>£300.00<b></tr></table>`;

     if (req.body.weighting == 'no'){
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£300.00 + disbs<b></h1>`;
    } else{
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£337.50 + disbs<b></h1>`;
    
        results += `(including London Weighting at 12.5%)`;
    }
    results+=`<br><br>`+ 
    `<div style="margin-left: 5%; margin-right: 5%; color: grey"><h6 style="color: grey;">Disbursements`+ " "+
    `are often the subject of negotiation and so are not included as "fixed" costs.`+ " "+
    `They will need to be added to the above total.`+ " "+
    `Prescribed disbursement limits for this type of case can be found at <a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a></h6><div>`;
    
    

   } else if(req.body.exceptions=='yes'){
    results = '<h4>Your Claim Escapes Fixed Costs because it satisfies the exception list.'+'<br><br>'+
    'You need to draw a Bill of Costs and claim on the Standard Basis</h4>';
   } else if (req.body.damages < 1000){
       results = '<h4>Your Claim Escapes Fixed Costs because it is within the Small Claims Track.'+'<br><br>';

  } else if (req.body.type == 'rta' || req.body.pi == 'yes'){
      console.log('rta');
      if (req.body.stage == '1/2'){
        console.log('1/2');
          if (req.body.damages <= 10000){
              console.log('under £10,000')
              amounttotal += 200 + 300;
              var vat1 =  200 * 0.20;
              var vat2 = 300 * 0.20;
              linetotal1 = 200 + vat1;
              linetotal2 = 300 + vat2;
              grandtotal = linetotal1 + linetotal2;
              vattotal = vat1;
              vattotal += vat2;
              vat1 =  (vat1).toFixed(2);
              vat2 = (vat2).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              linetotal2 = (linetotal2).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              results += 
              `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
              `<tr><td><h6>Stage 2</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

          } else{
              console.log('over £10,000')
              amounttotal += 200 + 600;
              var vat1 =  200 * 0.20;
              var vat2 = 600 * 0.20;
              linetotal1 = 200 + vat1;
              linetotal2 = 600 + vat2;
              grandtotal = linetotal1 + linetotal2;
              vattotal = vat1;
              vattotal += vat2;
              vat1 =  (vat1).toFixed(2);
              vat2 = (vat2).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              linetotal2 = (linetotal2).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              results += 
              `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
              `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
          }
        
        
      } else if (req.body.stage == 'A'){
          console.log('A');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 200 + 300 + 250;
            var vat1 =  200 * 0.20;
            var vat2 = 300 * 0.20;
            var vat3 = 250 * 0.20;
            linetotal1 = 200 + vat1;
            linetotal2 = 300 + vat2;
            linetotal3 = 250 + vat3;
            grandtotal = linetotal1 + linetotal2 + linetotal3;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 200 + 600 + 250;
            var vat1 =  200 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            linetotal1 = 200 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            grandtotal = linetotal1 + linetotal2 + linetotal3;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
          
      } else if (req.body.stage =='A+B'){
          console.log('A+B');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 200 + 300 + 250 + 250;
            var vat1 =  200 * 0.20;
            var vat2 = 300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            linetotal1 = 200 + vat1;
            linetotal2 = 300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 200 + 600 + 250 + 250;
            var vat1 =  200 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            linetotal1 = 200 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
      } else if (req.body.stage == 'A+C'){
          console.log('A+C');
          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 200 + 300 + 250 + 150;
            var vat1 =  200 * 0.20;
            var vat2 = 300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 150 * 0.20;
            linetotal1 = 200 + vat1;
            linetotal2 = 300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 150 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 200 + 600 + 250 + 250;
            var vat1 =  200 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 150 * 0.20;
            linetotal1 = 200 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 150 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
          
      } else if (req.body.stage == 'A+B+C'){
          console.log('A+B+C');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 200 + 300 + 250 + 250 + 150;
            var vat1 =  200 * 0.20;
            var vat2 = 300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            var vat5 = 150 * 0.20;
            linetotal1 = 200 + vat1;
            linetotal2 = 300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            linetotal5 = 150 + vat5;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4 + linetotal5;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vattotal += vat5;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vat5 = (vat5).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            linetotal5 = (linetotal5).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat5}</h6></td><td><h6>£${linetotal5}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 200 + 600 + 250 + 250 + 150;
            var vat1 =  200 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            var vat5 = 150 * 0.20;
            linetotal1 = 200 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            linetotal5 = 150 + vat5;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4 + linetotal5;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vattotal += vat5;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vat5 = (vat5).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            linetotal5 = (linetotal5).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£200.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat5}</h6></td><td><h6>£${linetotal5}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
      } else if (req.body.stage == 'pre-issue'){
          console.log('pre-issue');

          if (req.body.damages <= 5000){
              var cap = 550;
              var checkcap = req.body.damages * 0.20;
              checkcap += 100;
          

              if (checkcap > cap){
                  cap = checkcap;
              }

              amounttotal += cap;
              var vat1 =  cap * 0.20;
              linetotal1 = cap + vat1;
              grandtotal = linetotal1;
              vattotal = vat1;
              vat1 =  (vat1).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              cap = (cap).toFixed(2);
              results += 
              `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;



          } else if (req.body.damages > 5000 && req.body.damages <= 10000){

              var cap = 1100;
              var checkcap = (req.body.damages - 5000) * 0.15;
              cap += checkcap;

              amounttotal += cap;
              var vat1 =  cap * 0.20;
              linetotal1 = cap + vat1;
              grandtotal = linetotal1;
              vattotal = vat1;
              vat1 =  (vat1).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              cap = (cap).toFixed(2);
              results += 
              `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;

          } else if (req.body.damages > 10000){
                var cap = 1930;
                var checkcap = (req.body.damages - 10000) * 0.10;
                cap += checkcap;

                amounttotal += cap;
                var vat1 =  cap * 0.20;
                linetotal1 = cap + vat1;
                grandtotal = linetotal1;
                vattotal = vat1;
                vat1 =  (vat1).toFixed(2);
                vattotal = (vattotal).toFixed(2);
                linetotal1 = (linetotal1).toFixed(2);
                grandtotal = (grandtotal).toFixed(2);
                cap = (cap).toFixed(2);
                results += 
                `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
          }


      } else if (req.body.stage == 'pre-allocation'){
          console.log('pre-allocation');

          var cap = 1160;
          var checkcap = (req.body.damages) * 0.20;
          cap += checkcap;

          amounttotal += cap;
          var vat1 =  cap * 0.20;
          linetotal1 = cap + vat1;
          grandtotal = linetotal1;
          vattotal = vat1;
          vat1 =  (vat1).toFixed(2);
          vattotal = (vattotal).toFixed(2);
          linetotal1 = (linetotal1).toFixed(2);
          grandtotal = (grandtotal).toFixed(2);
          cap = (cap).toFixed(2);
          results += 
          `<tr><td><h6>Pre-Allocation</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
          links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      
        } else if (req.body.stage == 'pre-listing'){
            console.log('pre-listing');

            var cap = 1880;
            var checkcap = (req.body.damages) * 0.20;
            cap += checkcap;

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Pre-Listing</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      
        } else if (req.body.stage == 'pre-trial'){
            console.log('pre-trial');

            var cap = 2655;
            var checkcap = (req.body.damages) * 0.20;
            cap += checkcap;

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Pre-Trial</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      } else if (req.body.stage == 'trial'){
            console.log('trial');

            var cap = 2655;
            var checkcap = (req.body.damages) * 0.20;
            cap += checkcap;

            console.log(cap);

            if (req.body.damages <= 3000){
                cap += 500;
            } else if (req.body.damages > 3000 && req.body.damages <= 10000){
                cap += 710;
            } else if (req.body.damages > 10000 && req.body.damages <= 15000){
                cap += 1070;
            } else if (req.body.damages > 15000){
                cap += 1705;
            }

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Trial</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      }
      
  } else if (req.body.type == 'el'){
      console.log('el');

      if (req.body.stage == '1/2'){
        console.log('1/2');
          if (req.body.damages <= 10000){
              console.log('under £10,000')
              amounttotal += 300 + 600;
              var vat1 =  300 * 0.20;
              var vat2 = 600 * 0.20;
              linetotal1 = 300 + vat1;
              linetotal2 = 600 + vat2;
              grandtotal = linetotal1 + linetotal2;
              vattotal = vat1;
              vattotal += vat2;
              vat1 =  (vat1).toFixed(2);
              vat2 = (vat2).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              linetotal2 = (linetotal2).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              results += 
              `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
              `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

          } else{
              console.log('over £10,000')
              amounttotal += 300 + 1300;
              var vat1 =  300 * 0.20;
              var vat2 = 1300 * 0.20;
              linetotal1 = 300 + vat1;
              linetotal2 = 1300 + vat2;
              grandtotal = linetotal1 + linetotal2;
              vattotal = vat1;
              vattotal += vat2;
              vat1 =  (vat1).toFixed(2);
              vat2 = (vat2).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              linetotal2 = (linetotal2).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              results += 
              `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
              `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
          }
        
        
      } else if (req.body.stage == 'A'){
          console.log('A');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            grandtotal = linetotal1 + linetotal2 + linetotal3;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            grandtotal = linetotal1 + linetotal2 + linetotal3;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
          
      } else if (req.body.stage =='A+B'){
          console.log('A+B');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
      } else if (req.body.stage == 'A+C'){
          console.log('A+C');
          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 150 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 150 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
          
      } else if (req.body.stage == 'A+B+C'){
          console.log('A+B+C');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            var vat5 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            linetotal5 = 150 + vat5;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4 + linetotal5;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vattotal += vat5;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vat5 = (vat5).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            linetotal5 = (linetotal5).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat5}</h6></td><td><h6>£${linetotal5}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            var vat5 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            linetotal5 = 150 + vat5;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4 + linetotal5;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vattotal += vat5;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vat5 = (vat5).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            linetotal5 = (linetotal5).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat5}</h6></td><td><h6>£${linetotal5}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
      } else if (req.body.stage == 'pre-issue'){
          console.log('pre-issue');

          if (req.body.damages <= 5000){
              var cap = 950;
              var checkcap = req.body.damages * 0.175;
              cap += checkcap;
       
              amounttotal += cap;
              var vat1 =  cap * 0.20;
              linetotal1 = cap + vat1;
              grandtotal = linetotal1;
              vattotal = vat1;
              vat1 =  (vat1).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              cap = (cap).toFixed(2);
              results += 
              `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;



          } else if (req.body.damages > 5000 && req.body.damages <= 10000){

              var cap = 1855;
              var checkcap = (req.body.damages - 5000) * 0.125;
              cap += checkcap;

              amounttotal += cap;
              var vat1 =  cap * 0.20;
              linetotal1 = cap + vat1;
              grandtotal = linetotal1;
              vattotal = vat1;
              vat1 =  (vat1).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              cap = (cap).toFixed(2);
              results += 
              `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;

          } else if (req.body.damages > 10000){
                var cap = 2500;
                var checkcap = (req.body.damages - 10000) * 0.10;
                cap += checkcap;

                amounttotal += cap;
                var vat1 =  cap * 0.20;
                linetotal1 = cap + vat1;
                grandtotal = linetotal1;
                vattotal = vat1;
                vat1 =  (vat1).toFixed(2);
                vattotal = (vattotal).toFixed(2);
                linetotal1 = (linetotal1).toFixed(2);
                grandtotal = (grandtotal).toFixed(2);
                cap = (cap).toFixed(2);
                results += 
                `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
          }


      } else if (req.body.stage == 'pre-allocation'){
          console.log('pre-allocation');

          var cap = 2630;
          var checkcap = (req.body.damages) * 0.20;
          cap += checkcap;

          amounttotal += cap;
          var vat1 =  cap * 0.20;
          linetotal1 = cap + vat1;
          grandtotal = linetotal1;
          vattotal = vat1;
          vat1 =  (vat1).toFixed(2);
          vattotal = (vattotal).toFixed(2);
          linetotal1 = (linetotal1).toFixed(2);
          grandtotal = (grandtotal).toFixed(2);
          cap = (cap).toFixed(2);
          results += 
          `<tr><td><h6>Pre-Allocation</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
          links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      
        } else if (req.body.stage == 'pre-listing'){
            console.log('pre-listing');

            var cap = 3350;
            var checkcap = (req.body.damages) * 0.25;
            cap += checkcap;

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Pre-Listing</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      
        } else if (req.body.stage == 'pre-trial'){
            console.log('pre-trial');

            var cap = 4280;
            var checkcap = (req.body.damages) * 0.30;
            cap += checkcap;

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Pre-Trial</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      } else if (req.body.stage == 'trial'){
            console.log('trial');

            var cap = 4280;
            var checkcap = (req.body.damages) * 0.30;
            cap += checkcap;

            console.log(cap);

            if (req.body.damages <= 3000){
                cap += 500;
            } else if (req.body.damages > 3000 && req.body.damages <= 10000){
                cap += 710;
            } else if (req.body.damages > 10000 && req.body.damages <= 15000){
                cap += 1070;
            } else if (req.body.damages > 15000){
                cap += 1705;
            }

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Trial</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      }

  } else if (req.body.type == 'pl'){
      console.log('pl');

      if (req.body.stage == '1/2'){
        console.log('1/2');
          if (req.body.damages <= 10000){
              console.log('under £10,000')
              amounttotal += 300 + 600;
              var vat1 =  300 * 0.20;
              var vat2 = 600 * 0.20;
              linetotal1 = 300 + vat1;
              linetotal2 = 600 + vat2;
              grandtotal = linetotal1 + linetotal2;
              vattotal = vat1;
              vattotal += vat2;
              vat1 =  (vat1).toFixed(2);
              vat2 = (vat2).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              linetotal2 = (linetotal2).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              results += 
              `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
              `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

          } else{
              console.log('over £10,000')
              amounttotal += 300 + 1300;
              var vat1 =  300 * 0.20;
              var vat2 = 1300 * 0.20;
              linetotal1 = 300 + vat1;
              linetotal2 = 1300 + vat2;
              grandtotal = linetotal1 + linetotal2;
              vattotal = vat1;
              vattotal += vat2;
              vat1 =  (vat1).toFixed(2);
              vat2 = (vat2).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              linetotal2 = (linetotal2).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              results += 
              `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
              `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
          }
        
        
      } else if (req.body.stage == 'A'){
          console.log('A');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            grandtotal = linetotal1 + linetotal2 + linetotal3;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            grandtotal = linetotal1 + linetotal2 + linetotal3;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
          
      } else if (req.body.stage =='A+B'){
          console.log('A+B');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
      } else if (req.body.stage == 'A+C'){
          console.log('A+C');
          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 150 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 150 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
          
      } else if (req.body.stage == 'A+B+C'){
          console.log('A+B+C');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            var vat5 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            linetotal5 = 150 + vat5;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4 + linetotal5;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vattotal += vat5;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vat5 = (vat5).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            linetotal5 = (linetotal5).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat5}</h6></td><td><h6>£${linetotal5}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            var vat5 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            linetotal5 = 150 + vat5;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4 + linetotal5;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vattotal += vat5;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vat5 = (vat5).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            linetotal5 = (linetotal5).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat5}</h6></td><td><h6>£${linetotal5}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
      } else if (req.body.stage == 'pre-issue'){
          console.log('pre-issue');

          if (req.body.damages <= 5000){
              var cap = 950;
              var checkcap = req.body.damages * 0.175;
              cap += checkcap;
       
              amounttotal += cap;
              var vat1 =  cap * 0.20;
              linetotal1 = cap + vat1;
              grandtotal = linetotal1;
              vattotal = vat1;
              vat1 =  (vat1).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              cap = (cap).toFixed(2);
              results += 
              `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;



          } else if (req.body.damages > 5000 && req.body.damages <= 10000){

              var cap = 1855;
              var checkcap = (req.body.damages - 5000) * 0.10;
              cap += checkcap;

              amounttotal += cap;
              var vat1 =  cap * 0.20;
              linetotal1 = cap + vat1;
              grandtotal = linetotal1;
              vattotal = vat1;
              vat1 =  (vat1).toFixed(2);
              vattotal = (vattotal).toFixed(2);
              linetotal1 = (linetotal1).toFixed(2);
              grandtotal = (grandtotal).toFixed(2);
              cap = (cap).toFixed(2);
              results += 
              `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
              links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;

          } else if (req.body.damages > 10000){
                var cap = 2370;
                var checkcap = (req.body.damages - 10000) * 0.10;
                cap += checkcap;

                amounttotal += cap;
                var vat1 =  cap * 0.20;
                linetotal1 = cap + vat1;
                grandtotal = linetotal1;
                vattotal = vat1;
                vat1 =  (vat1).toFixed(2);
                vattotal = (vattotal).toFixed(2);
                linetotal1 = (linetotal1).toFixed(2);
                grandtotal = (grandtotal).toFixed(2);
                cap = (cap).toFixed(2);
                results += 
                `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
          }


      } else if (req.body.stage == 'pre-allocation'){
          console.log('pre-allocation');

          var cap = 2450;
          var checkcap = (req.body.damages) * 0.175;
          cap += checkcap;

          amounttotal += cap;
          var vat1 =  cap * 0.20;
          linetotal1 = cap + vat1;
          grandtotal = linetotal1;
          vattotal = vat1;
          vat1 =  (vat1).toFixed(2);
          vattotal = (vattotal).toFixed(2);
          linetotal1 = (linetotal1).toFixed(2);
          grandtotal = (grandtotal).toFixed(2);
          cap = (cap).toFixed(2);
          results += 
          `<tr><td><h6>Pre-Allocation</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
          links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      
        } else if (req.body.stage == 'pre-listing'){
            console.log('pre-listing');

            var cap = 3065;
            var checkcap = (req.body.damages) * 0.225;
            cap += checkcap;

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Pre-Listing</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      
        } else if (req.body.stage == 'pre-trial'){
            console.log('pre-trial');

            var cap = 3790;
            var checkcap = (req.body.damages) * 0.275;
            cap += checkcap;

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Pre-Trial</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      } else if (req.body.stage == 'trial'){
            console.log('trial');

            var cap = 3790;
            var checkcap = (req.body.damages) * 0.275;
            cap += checkcap;

            console.log(cap);

            if (req.body.damages <= 3000){
                cap += 500;
            } else if (req.body.damages > 3000 && req.body.damages <= 10000){
                cap += 710;
            } else if (req.body.damages > 10000 && req.body.damages <= 15000){
                cap += 1070;
            } else if (req.body.damages > 15000){
                cap += 1705;
            }

            amounttotal += cap;
            var vat1 =  cap * 0.20;
            linetotal1 = cap + vat1;
            grandtotal = linetotal1;
            vattotal = vat1;
            vat1 =  (vat1).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            cap = (cap).toFixed(2);
            results += 
            `<tr><td><h6>Trial</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
      }
  } else if (req.body.type == 'travel'){
      console.log('travel');
      if (req.body.stage == '1/2' || req.body.stage =='A' || req.body.stage =='A+B' || req.body.stage =='A+C' 
        || req.body.stage =='A+B+C'){
          results += '<h4>Your Claim Escapes Fixed Costs.'+'<br><br>'+
                    'You need to draw a Bill of Costs and claim on the Standard Basis</h4>';
                } else if (req.body.stage == 'pre-issue'){
                    console.log('pre-issue');
          
                    if (req.body.damages <= 5000){
                        var cap = 950;
                        var checkcap = req.body.damages * 0.175;
                        cap += checkcap;
                 
                        amounttotal += cap;
                        var vat1 =  cap * 0.20;
                        linetotal1 = cap + vat1;
                        grandtotal = linetotal1;
                        vattotal = vat1;
                        vat1 =  (vat1).toFixed(2);
                        vattotal = (vattotal).toFixed(2);
                        linetotal1 = (linetotal1).toFixed(2);
                        grandtotal = (grandtotal).toFixed(2);
                        cap = (cap).toFixed(2);
                        results += 
                        `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                        links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
          
          
          
                    } else if (req.body.damages > 5000 && req.body.damages <= 10000){
          
                        var cap = 1855;
                        var checkcap = (req.body.damages - 5000) * 0.10;
                        cap += checkcap;
          
                        amounttotal += cap;
                        var vat1 =  cap * 0.20;
                        linetotal1 = cap + vat1;
                        grandtotal = linetotal1;
                        vattotal = vat1;
                        vat1 =  (vat1).toFixed(2);
                        vattotal = (vattotal).toFixed(2);
                        linetotal1 = (linetotal1).toFixed(2);
                        grandtotal = (grandtotal).toFixed(2);
                        cap = (cap).toFixed(2);
                        results += 
                        `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                        links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
          
                    } else if (req.body.damages > 10000){
                          var cap = 2370;
                          var checkcap = (req.body.damages - 10000) * 0.10;
                          cap += checkcap;
          
                          amounttotal += cap;
                          var vat1 =  cap * 0.20;
                          linetotal1 = cap + vat1;
                          grandtotal = linetotal1;
                          vattotal = vat1;
                          vat1 =  (vat1).toFixed(2);
                          vattotal = (vattotal).toFixed(2);
                          linetotal1 = (linetotal1).toFixed(2);
                          grandtotal = (grandtotal).toFixed(2);
                          cap = (cap).toFixed(2);
                          results += 
                          `<tr><td><h6>Pre-Issue</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                          links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
                    }
          
          
                } else if (req.body.stage == 'pre-allocation'){
                    console.log('pre-allocation');
          
                    var cap = 2450;
                    var checkcap = (req.body.damages) * 0.175;
                    cap += checkcap;
          
                    amounttotal += cap;
                    var vat1 =  cap * 0.20;
                    linetotal1 = cap + vat1;
                    grandtotal = linetotal1;
                    vattotal = vat1;
                    vat1 =  (vat1).toFixed(2);
                    vattotal = (vattotal).toFixed(2);
                    linetotal1 = (linetotal1).toFixed(2);
                    grandtotal = (grandtotal).toFixed(2);
                    cap = (cap).toFixed(2);
                    results += 
                    `<tr><td><h6>Pre-Allocation</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                    links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
                
                  } else if (req.body.stage == 'pre-listing'){
                      console.log('pre-listing');
          
                      var cap = 3065;
                      var checkcap = (req.body.damages) * 0.225;
                      cap += checkcap;
          
                      amounttotal += cap;
                      var vat1 =  cap * 0.20;
                      linetotal1 = cap + vat1;
                      grandtotal = linetotal1;
                      vattotal = vat1;
                      vat1 =  (vat1).toFixed(2);
                      vattotal = (vattotal).toFixed(2);
                      linetotal1 = (linetotal1).toFixed(2);
                      grandtotal = (grandtotal).toFixed(2);
                      cap = (cap).toFixed(2);
                      results += 
                      `<tr><td><h6>Pre-Listing</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                      links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
                
                  } else if (req.body.stage == 'pre-trial'){
                      console.log('pre-trial');
          
                      var cap = 3790;
                      var checkcap = (req.body.damages) * 0.275;
                      cap += checkcap;
          
                      amounttotal += cap;
                      var vat1 =  cap * 0.20;
                      linetotal1 = cap + vat1;
                      grandtotal = linetotal1;
                      vattotal = vat1;
                      vat1 =  (vat1).toFixed(2);
                      vattotal = (vattotal).toFixed(2);
                      linetotal1 = (linetotal1).toFixed(2);
                      grandtotal = (grandtotal).toFixed(2);
                      cap = (cap).toFixed(2);
                      results += 
                      `<tr><td><h6>Pre-Trial</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                      links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
                } else if (req.body.stage == 'trial'){
                      console.log('trial');
          
                      var cap = 3790;
                      var checkcap = (req.body.damages) * 0.275;
                      cap += checkcap;
          
                      console.log(cap);
          
                      if (req.body.damages <= 3000){
                          cap += 500;
                      } else if (req.body.damages > 3000 && req.body.damages <= 10000){
                          cap += 710;
                      } else if (req.body.damages > 10000 && req.body.damages <= 15000){
                          cap += 1070;
                      } else if (req.body.damages > 15000){
                          cap += 1705;
                      }
          
                      amounttotal += cap;
                      var vat1 =  cap * 0.20;
                      linetotal1 = cap + vat1;
                      grandtotal = linetotal1;
                      vattotal = vat1;
                      vat1 =  (vat1).toFixed(2);
                      vattotal = (vattotal).toFixed(2);
                      linetotal1 = (linetotal1).toFixed(2);
                      grandtotal = (grandtotal).toFixed(2);
                      cap = (cap).toFixed(2);
                      results += 
                      `<tr><td><h6>Trial</h6></td><td><h6>£${cap}</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`;
                      links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a>`;
                }

  } else if (req.body.type == 'indisease'){
      console.log('indisease');
      
      if (req.body.stage != '1/2' && req.body.stage != 'A' && req.body.stage != 'A+B' && req.body.stage != 'A+C' &&
        req.body.stage != 'A+B+C'){
          indisease = true;
          results = '<h4>Your Claim Escapes Fixed Costs.'+'<br><br>'+
            'Part 7 Industrial Disease claims are subject to Standard Basis Costs.<br><br>'+
            'You need to have a Bill of Costs Drawn and Served.<br><br>'+
            'If you would like help with this please contact our <a href="https://thomas-legal.com/" target="_blank">costs experts</a></h4>';
            

         } else if (req.body.stage == '1/2'){
                console.log('1/2');
                  if (req.body.damages <= 10000){
                      console.log('under £10,000')
                      amounttotal += 300 + 600;
                      var vat1 =  300 * 0.20;
                      var vat2 = 600 * 0.20;
                      linetotal1 = 300 + vat1;
                      linetotal2 = 600 + vat2;
                      grandtotal = linetotal1 + linetotal2;
                      vattotal = vat1;
                      vattotal += vat2;
                      vat1 =  (vat1).toFixed(2);
                      vat2 = (vat2).toFixed(2);
                      vattotal = (vattotal).toFixed(2);
                      linetotal1 = (linetotal1).toFixed(2);
                      linetotal2 = (linetotal2).toFixed(2);
                      grandtotal = (grandtotal).toFixed(2);
                      results += 
                      `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
                      `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`;
                      links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        
                  } else{
                      console.log('over £10,000')
                      amounttotal += 300 + 1300;
                      var vat1 =  300 * 0.20;
                      var vat2 = 1300 * 0.20;
                      linetotal1 = 300 + vat1;
                      linetotal2 = 1300 + vat2;
                      grandtotal = linetotal1 + linetotal2;
                      vattotal = vat1;
                      vattotal += vat2;
                      vat1 =  (vat1).toFixed(2);
                      vat2 = (vat2).toFixed(2);
                      vattotal = (vattotal).toFixed(2);
                      linetotal1 = (linetotal1).toFixed(2);
                      linetotal2 = (linetotal2).toFixed(2);
                      grandtotal = (grandtotal).toFixed(2);
                      results += 
                      `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
                      `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`;
                      links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
                  }

        } else if (req.body.damages <= 10000 && req.body.stage == 'A'){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            grandtotal = linetotal1 + linetotal2 + linetotal3;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else if (req.body.damages > 10000 && req.body.stage == 'A'){
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            grandtotal = linetotal1 + linetotal2 + linetotal3;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        
          
      } else if (req.body.stage =='A+B'){
          console.log('A+B');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 250;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
      } else if (req.body.stage == 'A+C'){
          console.log('A+C');
          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 150 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 150 + vat4;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
          
      } else if (req.body.stage == 'A+B+C'){
          console.log('A+B+C');

          if (req.body.damages <= 10000){
            console.log('under £10,000')
            amounttotal += 300 + 600 + 250 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 600 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            var vat5 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 600 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            linetotal5 = 150 + vat5;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4 + linetotal5;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vattotal += vat5;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vat5 = (vat5).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            linetotal5 = (linetotal5).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£600.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat5}</h6></td><td><h6>£${linetotal5}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;

        } else{
            console.log('over £10,000')
            amounttotal += 300 + 1300 + 250 + 250 + 150;
            var vat1 =  300 * 0.20;
            var vat2 = 1300 * 0.20;
            var vat3 = 250 * 0.20;
            var vat4 = 250 * 0.20;
            var vat5 = 150 * 0.20;
            linetotal1 = 300 + vat1;
            linetotal2 = 1300 + vat2;
            linetotal3 = 250 + vat3;
            linetotal4 = 250 + vat4;
            linetotal5 = 150 + vat5;
            grandtotal = linetotal1 + linetotal2 + linetotal3 + linetotal4 + linetotal5;
            vattotal = vat1;
            vattotal += vat2;
            vattotal += vat3;
            vattotal += vat4;
            vattotal += vat5;
            vat1 =  (vat1).toFixed(2);
            vat2 = (vat2).toFixed(2);
            vat3 = (vat3).toFixed(2);
            vat4 = (vat4).toFixed(2);
            vat5 = (vat5).toFixed(2);
            vattotal = (vattotal).toFixed(2);
            linetotal1 = (linetotal1).toFixed(2);
            linetotal2 = (linetotal2).toFixed(2);
            linetotal3 = (linetotal3).toFixed(2);
            linetotal4 = (linetotal4).toFixed(2);
            linetotal5 = (linetotal5).toFixed(2);
            grandtotal = (grandtotal).toFixed(2);
            results += 
            `<tr><td><h6>Stage 1</h6></td><td><h6>£300.00</h6></td><td><h6>£${vat1}</h6></td><td><h6>£${linetotal1}</h6></td></tr>`+
            `<tr><td><h6>Stage 2</h6></td><td><h6>£1,300.00</h6></td><td><h6>£${vat2}</h6></td><td><h6>£${linetotal2}</h6></td></tr>`+
            `<tr><td><h6>Type A</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat3}</h6></td><td><h6>£${linetotal3}</h6></td></tr>`+
            `<tr><td><h6>Type B</h6></td><td><h6>£250.00</h6></td><td><h6>£${vat4}</h6></td><td><h6>£${linetotal4}</h6></td></tr>`+
            `<tr><td><h6>Type C</h6></td><td><h6>£150.00</h6></td><td><h6>£${vat5}</h6></td><td><h6>£${linetotal5}</h6></td></tr>`;
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.19" target="_blank">CPR Part 45.19</a>`;
        }
      }
    }

  amounttotal = amounttotal.toFixed(2);

  if (req.body.damages >=25000 && req.body.moj =='non-portal' || req.body.pi =='no'){
    var lastpara = [];
    var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
    for (const [key, value] of Object.entries(req.body)) {
        lastpara.push(key.toUpperCase(), value.toUpperCase());
        insertafter += `<tr><td>${key.toUpperCase()}</td><td>
        ${value.toUpperCase()}</td></tr>`;
    }
    insertafter += `</table></div>`;
  
  
    results += insertafter;
      console.log('coming here 1');
    res.send(html1+'<br><br>'+results+html2+html3);

    

  } else{
    console.log('coming here 3');
    results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${amounttotal}<b></h6></td><td><h6><b>£${vattotal}<b></h6></td>`+
    `<td><h6><b>£${grandtotal}<b></tr></table>`;
  
  
    if (req.body.weighting == 'yes'){
        var weighting = grandtotal * 0.125;
        console.log(typeof weighting);
        weighting = parseFloat(weighting);
        console.log(typeof grandtotal);
  
        grandtotal = parseFloat(grandtotal);
        grandtotal = grandtotal + weighting;
  
        grandtotal = grandtotal.toLocaleString("en", {minimumFractionDigits: 2});
  
        results += `<br><h1 style="color: grey; margin-left: 5%;`+
        `margin-right: 5%; test-align: center;"><b>£${grandtotal} + disbs<b></h1>`;
  
        results += `(inc. London Weighting at 12.5%)`;
  
    } else {
        grandtotal = parseFloat(grandtotal);
        grandtotal = grandtotal.toLocaleString("en", {minimumFractionDigits: 2});
        results += `<br><h1 style="color: grey; margin-left: 5%;`+
        `margin-right: 5%;"><b>£${grandtotal} + disbs<b></h1>`;
    }
    
    results+=`<br><br>`+ 
    `<div style="margin-left: 12%; margin-right: 12%; text-align: justify;
    text-justify: inter-word; margin-bottom: 0;"><h6 style="color: grey;">Disbursements`+ " "+
    `are often the subject of negotiation and so are not included as "fixed" costs.`+ " "+
    `They will need to be added to the above total.`+ " "+
    `Prescribed disbursement limits for this type of case can be found at ${links}</h6><div>`;

    var lastpara = [];
    var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
    for (const [key, value] of Object.entries(req.body)) {
        lastpara.push(key.toUpperCase(), value.toUpperCase());
        insertafter += `<tr><td>${key.toUpperCase()}</td><td>
        ${value.toUpperCase()}</td></tr>`;
    }
    insertafter += `</table></div>`;


  results += insertafter;
    if (req.body.part36 == 'claimantbeat'){
        if (req.body.stage !='1/2' && req.body.stage !='A' && req.body.stage != 'A+B' && 
        req.body.stage != 'A+C' && req.body.stage != 'A+B+C'){
            results += `<br>`+ `<h6>As the Claimant beat their Part 36 Offer at Trial, the Claimant will also be entitled to`+ " "+
            `costs for the period following the Part 36 Offer. If you would like further advice and assistance on`+ " "+
            `this point please contact our <a href="https://thomas-legal.com/" target="_blank">trusted costs experts</a></h6>`
        }
    } else if (req.body.part36 == 'defexpire'){
        if (req.body.stage !='1/2' && req.body.stage !='A' && req.body.stage != 'A+B' && 
        req.body.stage != 'A+C' && req.body.stage != 'A+B+C'){
            results += `<br>`+ `<h6>As the Defendant's Part 36 Offer expired, the Claimant will also be liable for`+ " "+
            `their costs for the period following the Part 36 Offer. If you would like further advice and assistance on`+ " "+
            `this point please contact our <a href="https://thomas-legal.com/" target="_blank">trusted costs experts</a></h6>`
        }
    }
  
    if (req.body.exceptions == 'yes'){
        results = `<h4>Your Claim does not qualify for Fixed Costs as you chose an exception`+ " "+
        `<br><br>`+
        `If you would like any further assistance please contact our <a href="https://thomas-legal.com/" target="_blank">trusted costs experts</a></h4>`;
        res.send(html1+'<br><br>'+results+html5+html3);
    } else if (indisease == true){
        results = '<h4>Your Claim Escapes Fixed Costs.'+'<br><br>'+
            'Part 7 Industrial Disease claims are subject to Standard Basis Costs.<br><br>'+
            'You need to have a Bill of Costs Drawn and Served.<br><br>'+
            'If you would like help with this please contact our <a href="https://thomas-legal.com/" target="_blank">costs experts</a></h4>';
            res.send(html1+'<br><br>'+results+html5+html3);
    } else if (req.body.type == 'travel' && req.body.stage == '1/2' || req.body.type == 'travel' && 
     req.body.stage == 'A' || req.body.type == 'travel' && req.body.stage == 'A+B' || 
     req.body.type == 'travel' && req.body.stage == 'A+B+C'){
        results = '<h4>Your Claim Escapes Fixed Costs.'+'<br><br>'+
        'Part 7 Travel Claims are not subject to the MOJ Portal Scheme.<br><br>'+
        'You need to have a Bill of Costs Drawn and Served.<br><br>'+
        'If you would like help with this please contact our <a href="https://thomas-legal.com/" target="_blank">costs experts</a></h4>';
     }
    
    res.send(html1+'<br><br>'+results+html2+html3);

  }
    
});

app.post('/showApplications',function(req,res){
    console.log(req.body);

    var results = "<table class='table table-striped table-light'><tr><th style='width: 30%'><p><b>"+
                "Item</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Amount</b></p></th>"+
                "<th class='thead-dark' style='width: 20%'><p>"+
                "<b>VAT</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Total</b></p></th>"+
                `<tr><td><h6>App</h6></td><td><h6>£250.00</h6></td><td><h6>£50.00</h6></td><td><h6>£300.00</h6></td></tr>`+
                `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£250.00<b></h6></td><td><h6><b>£50.00<b></h6></td>`+
                `<td><h6><b>£300.00<b></tr></table>`;
    

    if (req.body.weighting == 'no'){
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£300.00 + disbs<b></h1>`;
    } else{
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£337.50 + disbs<b></h1>`;
    
        results += `(including London Weighting at 12.5%)`;
    }

    var lastpara = [];
    var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
    for (const [key, value] of Object.entries(req.body)) {
        lastpara.push(key.toUpperCase(), value.toUpperCase());
        insertafter += `<tr><td>${key.toUpperCase()}</td><td>
        ${value.toUpperCase()}</td></tr>`;
    }
    insertafter += `</table></div>`;

    results+=`<br><br>`+ 
    `<div style="margin-left: 12%; margin-right: 12%; color: grey"><h6 style="color: grey;">Disbursements`+ " "+
    `are often the subject of negotiation and so are not included as "fixed" costs.`+ " "+
    `They will need to be added to the above total.`+ " "+
    `Prescribed disbursement limits for this type of case can be found at <a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#45.29I" target="_blank">CPR Part 45.29I</a></h6><div>`;

    results += insertafter;
    

    res.send(html1+'<br><br>'+results+html2+html3);
  });

app.post('/showMoney',function(req,res){
    console.log(req.body);
    var grandtotal = 0;
    var linetotal = 0;
    var links = '';
    var vat1 = 0;
    var isempty = false;
    var results = "<table class='table table-striped table-light'><tr><th style='width: 30%'><p><b>"+
                "Item</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Amount</b></p></th>"+
                "<th class='thead-dark' style='width: 20%'><p>"+
                "<b>VAT</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Total</b></p></th>";
                
     if (req.body.debt != 0 && req.body.debt <= 500){
        linetotal = 50.00;
        console.log(linetotal);

        if (req.body.personal == 1){
            linetotal = 60.00;
            console.log(linetotal);
        } else if (req.body.personal > 1){
            linetotal = 60.00;
            var addtotal = (req.body.personal - 1) * 15.00;
            console.log(`length is ${req.body.personal.length}`)
            console.log(addtotal);
            linetotal += addtotal;
            console.log(linetotal); 
        }

        vat1 = linetotal * 0.20;
        grandtotal = linetotal + vat1;
        grandtotal = (grandtotal).toFixed(2);
        linetotal = (linetotal).toFixed(2);
        vat1 = vat1.toFixed(2);
        results += `<tr><td><h6>Item</h6></td><td><h6>£${linetotal}</h6></td><td><h6>£${vat1}</h6>`+
        `</td><td><h6>£${grandtotal}</h6></td></tr>`;

        results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${linetotal}<b></h6></td><td><h6><b>£${vat1}<b></h6></td>`+
        `<td><h6><b>£${grandtotal}<b></tr></table>`;
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£${grandtotal}<b></h1>`;

    } else if (req.body.debt > 500 && req.body.debt <= 1000){
        linetotal = 70.00;

        if (req.body.personal == 1){
            linetotal = 80.00;
        } else if (req.body.personal > 1){
            linetotal = 80.00;
            var addtotal = (req.body.personal - 1) * 15.00;
            linetotal += addtotal;
        }

        vat1 = linetotal * 0.20;
        grandtotal = linetotal + vat1;
        grandtotal = (grandtotal).toFixed(2);
        linetotal = (linetotal).toFixed(2);
        vat1 = vat1.toFixed(2);
        results += `<tr><td><h6>Item</h6></td><td><h6>£${linetotal}</h6></td><td><h6>£${vat1}</h6>`+
        `</td><td><h6>£${grandtotal}</h6></td></tr>`;

        results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${linetotal}<b></h6></td><td><h6><b>£${vat1}<b></h6></td>`+
        `<td><h6><b>£${grandtotal}<b></tr></table>`;
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£${grandtotal}<b></h1>`;
        
    } else if (req.body.debt > 1000 && req.body.debt <= 5000 || req.body.empty == 'yes' || req.body.empty == 'no'
    && req.body.debt=='0'){
        linetotal = 80.00;
        isempty = true;
        if (req.body.personal == 1){
            linetotal = 90.00;
        } else if (req.body.personal > 1){
            linetotal = 90.00;
            var addtotal = (req.body.personal - 1) * 15.00;
            linetotal += addtotal;
        }

        vat1 = linetotal * 0.20;
        grandtotal = linetotal + vat1;
        grandtotal = (grandtotal).toFixed(2);
        linetotal = (linetotal).toFixed(2);
        vat1 = vat1.toFixed(2);
        results += `<tr><td><h6>Item</h6></td><td><h6>£${linetotal}</h6></td><td><h6>£${vat1}</h6>`+
        `</td><td><h6>£${grandtotal}</h6></td></tr>`;

        results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${linetotal}<b></h6></td><td><h6><b>£${vat1}<b></h6></td>`+
        `<td><h6><b>£${grandtotal}<b></tr></table>`;
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£${grandtotal}<b></h1>`;

    } else if (req.body.debt > 5000){
        linetotal = 100.00;

        if (req.body.personal == 1){
            linetotal = 110.00;
        } else if (req.body.personal > 1){
            linetotal = 110.00;
            var addtotal = (req.body.personal - 1) * 15.00;
            linetotal += addtotal;
        }

        vat1 = linetotal * 0.20;
        grandtotal = linetotal + vat1;
        grandtotal = (grandtotal).toFixed(2);
        linetotal = (linetotal).toFixed(2);
        vat1 = vat1.toFixed(2);
        results += `<tr><td><h6>Item</h6></td><td><h6>£${linetotal}</h6></td><td><h6>£${vat1}</h6>`+
        `</td><td><h6>£${grandtotal}</h6></td></tr>`;

        results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${linetotal}<b></h6></td><td><h6><b>£${vat1}<b></h6></td>`+
        `<td><h6><b>£${grandtotal}<b></tr></table>`;
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£${grandtotal}<b></h1>`;
    }
    
    links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.2" target="_blank">CPR Part 45.2</a>`;
    results+=`<br><br>`+ 
        `<div style="margin-left: 5%; margin-right: 5%; color: grey"><h6 style="color: grey;">`+
        `The calculations for this type of case can be found at ${links}`+ `<br><br>`+
        `If Judgment was obtained, there may be an additional fee if the requirements in 
        <a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.4" 
        target="_blank">CPR Part 45.4 </a>are satisfied</h6></div>`;

    if (req.body.debt != 0 && req.body.debt < 25 && req.body.empty == 'no'){
        results = '<h4>The claim is ineligible for Fixed Costs because'+'<br>'+ 
        'the debt is below the £25 threshold in'+" "+
        '<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.2"'+ 
        'target="_blank">CPR Part 45.2 </a></h4></div>';
            
    }

    if (req.body.debt != 0 && req.body.empty == 'yes'){
        results = '<h4>You have selected an empty claim form and have not included 0 in the value box'+" "+
        '<br><br>'+
        'Please go back and try again</h4>';
        
    }

    var lastpara = [];
    var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
    for (const [key, value] of Object.entries(req.body)) {
        lastpara.push(key.toUpperCase(), value.toUpperCase());
        insertafter += `<tr><td>${key.toUpperCase()}</td><td>
        ${value.toUpperCase()}</td></tr>`;
    }
    insertafter += `</table></div>`;
    results += insertafter;

    res.send(html1+'<br><br>'+results+html6+html3);
    });

    app.post('/showLand',function(req,res){
        console.log(req.body);
        var grandtotal = 0;
        var linetotal = 0;
        var links = '';
        var vat1 = 0;
        var results = "<table class='table table-striped table-light'><tr><th style='width: 30%'><p><b>"+
                    "Item</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Amount</b></p></th>"+
                    "<th class='thead-dark' style='width: 20%'><p>"+
                    "<b>VAT</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Total</b></p></th>";
                    
         if (req.body.personal == 0){
             linetotal = 69.50;

         }else if (req.body.personal == 1){
            linetotal = 77.00;
            console.log(linetotal);
        } else if (req.body.personal > 1){
            linetotal = 77.00;
            var addtotal = (req.body.personal - 1) * 15.00;
            console.log(addtotal);
            linetotal += addtotal;
            console.log(linetotal); 
        }

        vat1 = linetotal * 0.20;
        grandtotal = linetotal + vat1;
        grandtotal = (grandtotal).toFixed(2);
        linetotal = (linetotal).toFixed(2);
        vat1 = vat1.toFixed(2);
        results += `<tr><td><h6>Item</h6></td><td><h6>£${linetotal}</h6></td><td><h6>£${vat1}</h6>`+
        `</td><td><h6>£${grandtotal}</h6></td></tr>`;

        results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${linetotal}<b></h6></td><td><h6><b>£${vat1}<b></h6></td>`+
        `<td><h6><b>£${grandtotal}<b></tr></table>`;
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£${grandtotal}<b></h1>`;        
        
        links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.5" target="_blank">CPR Part 45.5</a>`;
        results+=`<br><br>`+ 
            `<div style="margin-left: 5%; margin-right: 5%; color: grey"><h6 style="color: grey;">`+
            `The calculations for this type of case can be found at ${links}` + `<br><br>`+
            `If Judgment was obtained, there may be an additional fee if the requirements in 
            <a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.6" 
            target="_blank">CPR Part 45.6 </a>are satisfied</h6></div>`;
    
        var lastpara = [];
        var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
        for (const [key, value] of Object.entries(req.body)) {
            lastpara.push(key.toUpperCase(), value.toUpperCase());
            insertafter += `<tr><td>${key.toUpperCase()}</td><td>
            ${value.toUpperCase()}</td></tr>`;
        }
        insertafter += `</table></div>`;
        results += insertafter;

        res.send(html1+'<br><br>'+results+html6+html3);
        });

    app.post('/showEnforcement',function(req,res){
        console.log(req.body);
        var grandtotal = 0;
        var linetotal = 0;
        var links = '';
        var vat1 = 0;
        var results = "<table class='table table-striped table-light'><tr><th style='width: 30%'><p><b>"+
                    "Item</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Amount</b></p></th>"+
                    "<th class='thead-dark' style='width: 20%'><p>"+
                    "<b>VAT</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Total</b></p></th>";
                    
        if (req.body.debt > 25 && req.body.debt <= 250){
            linetotal += 30.75;
        } else if (req.body.debt > 250 && req.body.debt <= 600){
            linetotal += 41.00;
        } else if (req.body.debt > 600 && req.body.debt <= 2000){
            linetotal += 69.50;
        } else if (req.body.debt > 2000){
            linetotal += 75.50;
        }

        if (req.body.attend > 0){
            var addup = req.body.attend * 30;
            linetotal += addup;
        }

        vat1 = linetotal * 0.20;
        grandtotal = linetotal + vat1;
        grandtotal = (grandtotal).toFixed(2);
        linetotal = (linetotal).toFixed(2);
        vat1 = vat1.toFixed(2);
        results += `<tr><td><h6>Item</h6></td><td><h6>£${linetotal}</h6></td><td><h6>£${vat1}</h6>`+
        `</td><td><h6>£${grandtotal}</h6></td></tr>`;

        results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${linetotal}<b></h6></td><td><h6><b>£${vat1}<b></h6></td>`+
        `<td><h6><b>£${grandtotal}<b></tr></table>`;
        results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£${grandtotal}<b></h1>`;        
        
        links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.8" target="_blank">CPR Part 45.8</a>`;
        results+=`<br><br>`+ 
            `<div style="margin-left: 12%; margin-right: 12%; color: grey"><h6 style="color: grey;">`+
            `If the Claimant carried out additional work such as obtaining warrants, orders or writs, they`+" "+
            `may be able to claim additional fees if the criteria in ${links} are satisfied</h6><div>`;

        if (req.body.debt < 25){
            results = '<h4>The claim is ineligible for Fixed Costs because'+'<br>'+ 
            'the debt is below the £25 threshold in'+" "+
            '<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.8"'+ 
            'target="_blank">CPR Part 45.8 </a></h4></div>';
        } 
    
        var lastpara = [];
        var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
        for (const [key, value] of Object.entries(req.body)) {
            lastpara.push(key.toUpperCase(), value.toUpperCase());
            insertafter += `<tr><td>${key.toUpperCase()}</td><td>
            ${value.toUpperCase()}</td></tr>`;
        }
        insertafter += `</table></div>`;
        results += insertafter;

        res.send(html1+'<br><br>'+results+html2+html3);
        });

    app.post('/showHmrc',function(req,res){
        console.log(req.body);
        console.log('HMRC working');
        var grandtotal = 0;
        var linetotal = 0;
        var links = '';
        var vat1 = 0;
        var results = "<table class='table table-striped table-light'><tr><th style='width: 30%'><p><b>"+
                    "Item</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Amount</b></p></th>"+
                    "<th class='thead-dark' style='width: 20%'><p>"+
                    "<b>VAT</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Total</b></p></th>";
                    
       if (req.body.damages > 25 && req.body.damages <= 500){
            linetotal += 33.00;
        } else if (req.body.damages > 500 && req.body.damages <= 1000){
            linetotal += 47.00;
        } else if (req.body.damages > 1000 && req.body.damages <= 5000){
            linetotal += 53.00;
        } else if (req.body.damages > 5000 && req.body.damages <= 15000){
            linetotal += 67.00;
        } else if (req.body.damages > 15000 && req.body.damages <= 50000){
            linetotal += 90.00;
        } else if (req.body.damages > 50000 && req.body.damages <= 100000){
            linetotal += 113.00;
        } else if (req.body.damages > 100000 && req.body.damages <= 150000){
            linetotal += 127.00;
        } else if (req.body.damages > 150000 && req.body.damages <= 200000){
            linetotal += 140.00;
        } else if (req.body.damages > 200000 && req.body.damages <= 250000){
            linetotal += 153.00;
        } else if (req.body.damages > 250000 && req.body.damages <= 300000){
            linetotal += 167.00;
        } else if (req.body.damages > 300000){
            linetotal += 180.00;
        }

        vat1 = linetotal * 0.20;
        grandtotal = linetotal + vat1;
        grandtotal = (grandtotal).toFixed(2);
        linetotal = (linetotal).toFixed(2);
        vat1 = vat1.toFixed(2);

        if (req.body.exceptions != 'no'){
            results += `<tr><td><h6>Item</h6></td><td><h6>£${linetotal}</h6></td><td><h6>£${vat1}</h6>`+
            `</td><td><h6>£${grandtotal}</h6></td></tr>`;

            results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${linetotal}<b></h6></td><td><h6><b>£${vat1}<b></h6></td>`+
            `<td><h6><b>£${grandtotal}<b></tr></table>`;
            results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£${grandtotal}<b></h1>`;        
            
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.34" target="_blank">CPR Part 45.34</a>`;
            results+=`<br><br>`+ 
            `<div style="margin-left: 5%; margin-right: 5%; color: grey"><h6 style="color: grey;">`+
            `If the Claimant carried out additional work such as obtaining warrants, orders or writs, they`+" "+
            `may be able to claim additional fees if the criteria in ${links} are satisfied</h6><div>`;

        }
        
        if (req.body.damages < 25 && req.body.exceptions == 'yes'){
            results = '<h4>Your Claim is ineligible for Fixed Costs because the value is below the £25 threshold</h4>';
        }

        if (req.body.exceptions == 'no'){
            results = '<h4>Your Claim is ineligible for Fixed Costs because you chose an exception</h4>';
        }

        var lastpara = [];
        var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
        for (const [key, value] of Object.entries(req.body)) {
            lastpara.push(key.toUpperCase(), value.toUpperCase());
            insertafter += `<tr><td>${key.toUpperCase()}</td><td>
            ${value.toUpperCase()}</td></tr>`;
        }
        insertafter += `</table></div>`;
        results += insertafter;
    
        res.send(html1+'<br><br>'+results+html2+html3);
        });
    
    app.post('/showFasttrack',function(req,res){
        console.log(req.body);
        console.log('HMRC working');
        var grandtotal = 0;
        var linetotal = 0;
        var links = '';
        var vat1 = 0;
        var results = "<table class='table table-striped table-light'><tr><th style='width: 30%'><p><b>"+
                    "Item</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Amount</b></p></th>"+
                    "<th class='thead-dark' style='width: 20%'><p>"+
                    "<b>VAT</b></p></th><th class='thead-dark' style='width: 25%'><p><b>Total</b></p></th>";
                    
        if (req.body.damages <= 3000){
            linetotal += 485.00;
        } else if (req.body.damages > 3000 && req.body.damages <= 10000){
            linetotal += 690.00;
        } else if (req.body.damages > 10000 && req.body.damages <= 15000){
            linetotal += 1035.00;
        } else if (req.body.damages > 15000 && req.body.issued > '2009-04-06'){
            linetotal += 1650.00;
        } else {
            linetotal = 1035.00
        }

        vat1 = linetotal * 0.20;
        grandtotal = linetotal + vat1;
        grandtotal = (grandtotal).toFixed(2);
        linetotal = (linetotal).toFixed(2);
        vat1 = vat1.toFixed(2);

        grandtotal = grandtotal.toLocaleString("en", {minimumFractionDigits: 2});

        if (req.body.exceptions != 'no'){
            results += `<tr><td><h6>Item</h6></td><td><h6>£${linetotal}</h6></td><td><h6>£${vat1}</h6>`+
            `</td><td><h6>£${grandtotal}</h6></td></tr>`;

            results += `<tr><td><h6><b>TOTALS<b></h6></td><td><h6><b>£${linetotal}<b></h6></td><td><h6><b>£${vat1}<b></h6></td>`+
            `<td><h6><b>£${grandtotal}<b></tr></table>`;
            results += `<br><h1 style="color: grey; margin-left: 5%; margin-right: 5%;"><b>£${grandtotal}<b></h1>`;        
            
            links = `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#rule45.39" target="_blank">CPR Part 45.39</a>`;
            results+=`<br><br>`+ 
            `<div style="margin-left: 5%; margin-right: 5%; color: grey"><h6 style="color: grey;">`+
            `FTT fixed costs can be changed at the discretion of the Court,`+" "+
            `in accordance with criteria in ${links}</h6><div>`;

        }
        
        console.log(req.body.issued > '2009-04-06');

        var lastpara = [];
        var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
        for (const [key, value] of Object.entries(req.body)) {
            lastpara.push(key.toUpperCase(), value.toUpperCase());
            insertafter += `<tr><td>${key.toUpperCase()}</td><td>
            ${value.toUpperCase()}</td></tr>`;
        }
        insertafter += `</table></div>`;
        results += insertafter;
    
        res.send(html1+'<br><br>'+results+html2+html3);
        });

    app.post('/showIp',function(req,res){
        console.log(req.body);
        console.log('IP working');
        var results = '';
        
        if (req.body.ipec == 'no'){
            results = '<h4>The claim does not qualify for Fixed Costs because it is not proceeding in the IPEC</h4>';
        } else if (req.body.liability == 'no' || req.body.quantum == 'no'){
            results += `<h4>Your Claim exceeds the capped figures in`+ " "+
            `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs/practice-direction-45-fixed-costs#3.1"`+
            `target="_blank">CPR Part 45 PD 3</a>`+
            `<br><br>`+
            `If you would like any further assistance please contact our <a href="https://thomas-legal.com/" target="_blank">trusted costs experts</a></h4>`;
        } else {
            results += `<h4>Your Claim is within the prescribed limits`+ " "+
            `<br><br>`+
            `If you would like any further assistance please contact our <a href="https://thomas-legal.com/" target="_blank">trusted costs experts</a></h4>`;
        }                   
        
        var lastpara = [];
        var insertafter = '<div id="showafter" style="display: none; margin-top: -20%;"><h4>YOUR ANSWERS</h4><table>';
        for (const [key, value] of Object.entries(req.body)) {
            lastpara.push(key.toUpperCase(), value.toUpperCase());
            insertafter += `<tr><td>${key.toUpperCase()}</td><td>
            ${value.toUpperCase()}</td></tr>`;
        }
        insertafter += `</table></div>`;
        results += insertafter;
    
        res.send(html1+'<br><br>'+results+html5);
        });

    app.post('/showAarhus',function(req,res){
        console.log(req.body);
        console.log('Aarhus working');
        var results = '';

        if (req.body.who == 'individual' && req.body.costs > 5000 || req.body.who == 'business' && req.body.costs > 10000 || 
        req.body.who == 'defendant' && req.body.costs > 35000){
            results += `<h4>Your Claim exceeds the capped figures in`+ " "+
            `<a href="https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part45-fixed-costs#sectionVII"`+
            `target="_blank">CPR Part 45.43</a>`+
            `<br><br>`+
            `If you would like any further assistance please contact our <a href="https://thomas-legal.com/" target="_blank">trusted costs experts</a></h4>`;
        } else {
            results += `<h4>Your Claim is within the prescribed limits`+ " "+
            `<br><br>`+
            `If you would like any further assistance please contact our <a href="https://thomas-legal.com/" target="_blank">trusted costs experts</a></h4>`;
        }            
        
    
        res.send(html1+'<br><br>'+results+html5);
        });
        

server.listen(process.env.PORT || 8080);

console.log("Running at Port 8080");
