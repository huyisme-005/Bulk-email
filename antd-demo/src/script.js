// script.js
import user from "./sample.json" assert { type: 'json' };
console.log(user)
const content=require("./sample.json");
let data=JSON.parse(content);
data.forEach((item) => {
    item['Email']=[`$`];
});
