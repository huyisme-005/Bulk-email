import 'antd/dist/reset.css';
import './App.css';
import {Button} from 'antd';
import defaultExport  from './table.js'
import Table from './table.js';


async function App() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    
  ];

const data = [
    {
      key: '1',
      name: 'Test1',
      age: 1,
    },
    {
      key: '2',
      name: 'Test2',
      age: 2,
    },
  ];


 
 
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

