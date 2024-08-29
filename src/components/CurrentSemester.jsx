import React from 'react';

const gradeOptions = ["SELECT", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

function CurrentSemester({ courses, setCourses, gradeOptions }) {
  const handleCourseChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: '', creditHours: '' }]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Current Semester Courses</h2>
      {courses.map((course, index) => (
        <div className="mb-4 p-4 border rounded-xl" key={index}>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Enter course name"
            value={course.name}
            onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            <select
              className="select select-bordered w-full"
              value={course.grade}
              onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
            >
              {gradeOptions.map((option, i) => (
                <option value={option} key={i}>{option}</option>
              ))}
            </select>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Credit Hours"
              value={course.creditHours}
              onChange={(e) => handleCourseChange(index, 'creditHours', e.target.value)}
            />
          </div>
          {index > 0 && (
            <button className="btn btn-error w-full sm:w-auto" onClick={() => removeCourse(index)}>Remove Course</button>
          )}
        </div>
      ))}
      <button className="btn btn-primary w-full sm:w-auto" onClick={addCourse}>Add Course</button>
    </div>
  );
}

export default CurrentSemester;