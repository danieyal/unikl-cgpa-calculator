import React from 'react';

function Results({ result }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">GPA</div>
          <div className="stat-value">{result.semesterGPA}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">CGPA</div>
          <div className="stat-value">{result.cgpa}</div>
        </div>
      </div>
    </div>
  );
}

export default Results;