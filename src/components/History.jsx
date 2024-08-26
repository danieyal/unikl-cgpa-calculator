import React from 'react';

function History({ history }) {
  return (
    <div className="container mx-auto min-h-dvh max-w-3xl p-8">
      <h2 className="text-2xl font-bold mb-4">Calculation History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Semester GPA</th>
              <th>CGPA</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.semesterGPA}</td>
                <td>{entry.cgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
