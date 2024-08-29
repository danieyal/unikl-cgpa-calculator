import React from 'react';

function PreviousSemesters({ previousSemesters, setPreviousSemesters }) {
  const addSemester = () => {
    setPreviousSemesters([...previousSemesters, { cgpa: '' }]);
  };

  const removeSemester = (index) => {
    const newSemesters = previousSemesters.filter((_, i) => i !== index);
    setPreviousSemesters(newSemesters);
  };

  const handleSemesterChange = (index, field, value) => {
    const newSemesters = [...previousSemesters];
    newSemesters[index][field] = value;
    setPreviousSemesters(newSemesters);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Previous Semesters</h2>
      {previousSemesters.map((semester, index) => (
        <div key={index} className="mb-4 p-4 border rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Semester {index + 1}</h3>
            {index > 0 && (
              <button className="btn btn-circle btn-sm" onClick={() => removeSemester(index)}>X</button>
            )}
          </div>
          <div className="flex items-center">
            <label className="mr-2" htmlFor={`cgpa-${index}`}>CGPA:</label>
            <input
              className="input input-bordered flex-grow"
              type="text"
              id={`cgpa-${index}`}
              value={semester.cgpa}
              onChange={(e) => handleSemesterChange(index, 'cgpa', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button className="btn btn-primary w-full sm:w-auto" onClick={addSemester}>Add Semester</button>
    </div>
  );
}

export default PreviousSemesters;