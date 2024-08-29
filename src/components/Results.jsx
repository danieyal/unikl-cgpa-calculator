import React from 'react';

function Results({ result }) {
  return (
    <div className="flex justify-center items-center">
      <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 rounded-lg m-4 dark:bg-base-300 dark:text-white dark:border-gray-700">
        <div className="stat">
          <div className="stat-title">GPA</div>
          <div className="stat-value">{result.semesterGPA}</div>
        </div>
        <div className="stat">
          <div className="stat-title">CGPA</div>
          <div className="stat-value">{result.cgpa}</div>
        </div>
      </div>
    </div>
  );
}

export default Results;