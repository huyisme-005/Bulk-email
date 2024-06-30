// script.js
//import user from "./sample.json" assert { type: 'json' };
//console.log(user)
//const filename=prompt("Input a json filename:");
const content=require("./sample.json");
//const content=require(filename);
var data=JSON.parse(JSON.stringify(content));
data.forEach((item) => {
    item["Email aliases"]=[item["First name"]+item["Address"].split(", ")[0].split(" ").join("")
+"@platihub.com",item["Last name"]+item["Birthplace"].split(", ")[1].split(" ").join("_")+"@platihub.com"
,item["Last name"]+"."+item["First name"]+item["Phone number"].split("-")[1]
+"@platihub.com"];
});
console.log(JSON.stringify(data));
window.document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 4);

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

function downloadAsExcel(){
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
        Sheets: {
            'data' : worksheet
        },
        SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    console.log(excelBuffer);
    saveAsExcel(excelBuffer, 'data_template');
}

function saveAsExcel(buffer, filename){
    const data = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, filename+new Date().getTime()+EXCEL_EXTENSION);
}
