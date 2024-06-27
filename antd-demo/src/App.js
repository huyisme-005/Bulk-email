import 'antd/dist/reset.css';
import './App.css';
import {Button} from 'antd';
import defaultExport  from './table.js'
import Table from './table.js';
import {React} from 'react';


async function App() {
  const columns = [
    {
      name:"Name",
      selector:row=>row.name
    },
    {
      name:"Email",
      selector:row=>row.email
    },
    {
      name:"Phone number",
      selector:row=>row.phone_number
    },
    
  ];
const url="https://docs.sheetjs.com/executive.json";

const data = await (await fetch(url)).json();



 
 
  return (
    <div className="App">
      <header className="App-header">
        
        <Button type='primary'>My First Button</Button>
        
        <Table columns={columns} dataSource={data} />
      </header>
    </div>
  );
}

export default App;

