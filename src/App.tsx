import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import CSVReader, { IFileInfo } from 'react-csv-reader';
import { ParsedStudentInfo, TransformedStudentInfo } from './types/Student';
import { transformStudentData } from './utils/transformStudentData';

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, '_'),
};

function App() {
  const [studentData, setStudentData] = useState<TransformedStudentInfo[]>([]);

  const handleForce = (data: ParsedStudentInfo[], fileInfo: IFileInfo) => {
    const transformedStudentData = data.map((student) =>
      transformStudentData(student)
    );
    setStudentData(transformedStudentData);
  };

  console.log(studentData);

  return (
    <div>
      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
    </div>
  );
}

export default App;
