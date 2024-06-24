import express from 'express';
import fileUpload from 'express-fileupload';
import xlsx from 'xlsx';
const app=express();
const port=3000;
var selectedRow=null;
app.use(fileUpload());
app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const file = req.files.file;
    const workbook = xlsx.read(file.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
  
    // Process each row in the Excel file
    for (const row of data) {
      const { FirstName, LastName } = row;
      const alias = `${FirstName}.${LastName}@platihub.com`.toLowerCase();
  
      try {
        await createZohoAlias(FirstName, LastName, alias);
      } catch (error) {
        console.error('Error creating alias for', alias, ':', error);
      }
    }
  
    res.send({ message: 'File uploaded and aliases created successfully' });
  });

  const createZohoAlias = async (firstName, lastName, alias) => {
    const zohoApiUrl = 'https://www.zohoapis.com/your_api_endpoint'; // Endpoint ???
    const apiKey = 'your_zoho_api_key'; // zoho api key >> cần generate key để đe
    
      const response = await axios.post(
        zohoApiUrl,
        {
          firstName,
          lastName,
          alias,
        },
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
    
      if (response.status !== 200) {
        throw new Error(`Error creating alias: ${response.statusText}`);
      }
    
      return response.data;
    };

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
      
      app.use(cors({
          origin: 'http://localhost:3001',
          credentials: true, 
        }));
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
          });
          
          app.use(cors({
              origin: 'http://localhost:3001',
              credentials: true, 
            }));

//show alerts
function showAlert(message,className){
    const div=document.createElement("div");
    div.className='alert alert-${className}';
    
    div.appendChild(document.createTextNode(message));
    const container=document.querySelector(".ontainer");
    const main=document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(()=>document.querySelector(".alert").remove(),3000);

}

//Clear all fields
function clearFields(){
    document.querySelector("#firstName").value="";
    document.querySelector("#lastName").value="";
    document.querySelector("#rollNo").value="";
    document.querySelector("#hostEmail").value="";
}

//Add Data
document.querySelector("#student-form").addEventListener("submit",(e)=>{
    e.preventDefault();

    //get form values
    const firstName=document.querySelector("#firstName").value;
    const lastName=document.querySelector("#lastName").value;
    const rollNo=document.querySelector("#rollNo").value;
    const hostEmail=document.querySelector("#hostEmail").value;
    
    //validate
    if(firstName==""||lastName==""||rollNo==""||hostEmail==""){
        showAlert("Please fill in all fields","danger");
    }
    else{
        if(selectedRow==null){
            const list=document.querySelector("#student-list");
            const row=document.createElement("tr");

            row.innerHTML='<td>${firstName}</td><td>${lastName}</td><td>${rollNo}</td><td>${hostEmail}</td><td><a href="#" class="btn btn-warning btn-sm edit">Edit</a><a href="#" class="btn btn-danger btn-sm delete">Delete</a>'
            list.appendChild(row);
            selectedRow=null;
            showAlert("Student Added","success");
        }
         
        else{
            selectedRow.children[0].textContent=firstName;
            selectedRow.children[1].textContent=lastName;
            selectedRow.children[2].textContent=rollNo;
            selectedRow.children[3].textContent=hostEmail;
            selectedRow=null;
            showAlert("Student Info Edited","info");
        }
       clearFields();
    }
});

//Edit Data
document.querySelector("#student-list").addEventListener("click",(e)=>{
target=e.target;
if(target.classList.contains("edit")){
    selectedRow=target.parentElement.parentElement;
    document.querySelector("#firstName").value=selectedRow.children[0].textContent;
    document.querySelector("#lastName").value=selectedRow.children[1].textContent;
    document.querySelector("#rollNo").value=selectedRow.children[0].textContent;
    document.querySelector("#hostEmail").value=selectedRow.children[1].textContent;
}
});

//Delete Data
document.querySelector("#student-list").addEventListener("click",(e)=>{
target=e.target;
if(target.classList.contains("delete")){
    target.parentElement.parentElement.remove();
    showAlert("Student Data Deleted","danger");
}
});