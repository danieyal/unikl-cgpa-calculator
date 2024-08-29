import React from 'react';

function History({ history }) {
  return (
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Calculation History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Semester GPA</th>
              <th className="px-4 py-2">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index} className="hover:bg-base-200">
                <td className="border px-4 py-2">{entry.date}</td>
                <td className="border px-4 py-2">{entry.semesterGPA}</td>
                <td className="border px-4 py-2">{entry.cgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;