// script.js
//import user from "./sample.json" assert { type: 'json' };
//console.log(user)
const content=require("./sample.json");
var data=JSON.parse(JSON.stringify(content));
data.forEach((item) => {
    item["Email aliases"]=[item["First name"]+item["Address"].split(", ")[0].join("")
+"@platihub.com",item["Last name"]+item["Birthplace"].split(", ")[0].join("")+"@platihub.com"
,item["Birthplace"].split(", ")[2].split(" ").join("_")+item["Phone number"].split("-")[1]
+"@platihub.com"];
});
console.log(JSON.stringify(data));
