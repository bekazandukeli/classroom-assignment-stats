import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import CSVReader, { IFileInfo } from 'react-csv-reader';
import { ParsedStudentInfo, TransformedStudentInfo } from './types/Student';
import { transformStudentData } from './utils/transformStudentData';
import reactorStudents from './data/ReactorStudents.json';
import 'chart.js/auto';
import { Bar, Chart } from 'react-chartjs-2';

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, '_'),
};

function App() {
  const [studentData, setStudentData] = useState<TransformedStudentInfo[]>([]);

  const handleForce = (data: ParsedStudentInfo[], fileInfo: IFileInfo) => {
    const transformedStudentData = data
      .filter((entry) => entry.email_address)
      .map((student) => transformStudentData(student));
    setStudentData(transformedStudentData);
  };

  const filterReactorStudents = (students: TransformedStudentInfo[]) => {
    return students
      .filter((student) => {
        return reactorStudents.find(
          (reactorStudent) =>
            student.email_address.toLowerCase() ===
            reactorStudent.email_address.toLowerCase()
        );
      })
      .sort((studentA, studentB) => {
        const challengeCountA = studentA.challenges.reduce((a, b) => a + b);
        const challengeCountB = studentB.challenges.reduce((a, b) => a + b);
        if (challengeCountA < challengeCountB) return -1;
        else return 1;
      });
  };

  const labels = filterReactorStudents(studentData).map(
    (student) => `${student.first_name} ${student.last_name}`
  );
  const data = filterReactorStudents(studentData).map((student) =>
    student.challenges.reduce((a, b) => a + b)
  );

  console.log(labels);
  console.log(data);

  return (
    <div>
      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      {studentData.length ? (
        <Chart
          type="bar"
          style={{ width: '100vw' }}
          data={{
            labels: labels,
            datasets: [
              {
                label: 'Assignment Submissions',
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)',
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)',
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      ) : null}
    </div>
  );
}

export default App;
