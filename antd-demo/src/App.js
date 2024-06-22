import 'antd/dist/reset.css';
import './App.css';
import {Button} from 'antd';
import defaultExport  from './table.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button type='primary'>My First Button</Button>
        <table>My dynamic table</table>
      </header>
    </div>
  );
}

export default App;
