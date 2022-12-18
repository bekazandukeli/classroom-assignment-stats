import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CSVReader, { IFileInfo } from 'react-csv-reader';


const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, "_")
};

function App() {
  const [data, setData] = useState(0)
  
  const handleForce = (data: any[], fileInfo: IFileInfo) => {
    console.log(data, fileInfo);
    setData(data);
  };

  return (
    <div>
      <CSVReader 
        cssClass="react-csv-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
    </div>
  )
}

export default App
