import React, { useState, useEffect } from 'react';

const MAX_COURSES = 10;
const gradeOptions = ["SELECT", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

function App() {
  const [courses, setCourses] = useState(Array.from({ length: MAX_COURSES }, () => ({ name: '', grade: '', creditHours: '' })));
  const [cgpa, setCgpa] = useState('');
  const [ccc, setCcc] = useState('');
  const [cgp, setCgp] = useState('');
  const [result, setResult] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleCourseChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const calculateCGPA = () => {
    try {
      let currentCgpa = parseFloat(cgpa);
      let currentCcc = parseFloat(ccc);
      let currentCgp = parseFloat(cgp);

      if (isNaN(currentCgpa) || isNaN(currentCcc) || isNaN(currentCgp)) {
        alert("Please enter valid numeric values for CGPA, CCC, and CGP.");
        return;
      }

      let semesterGradePoints = [];
      let totalCreditHours = currentCcc;
      let semesterCreditHours = 0;
      let semesterTotalGradePoints = 0;

      for (let i = 0; i < MAX_COURSES; i++) {
        let { name, grade, creditHours } = courses[i];
        creditHours = parseFloat(creditHours);

        if (!isNaN(creditHours) && creditHours > 0 && gradeOptions.includes(grade)) {
          let gradePoint = getGradePoint(grade) * creditHours;
          semesterGradePoints.push(gradePoint);
          totalCreditHours += creditHours;
          semesterCreditHours += creditHours;
          semesterTotalGradePoints += gradePoint;
        }
      }

      let semesterGPA = semesterTotalGradePoints / semesterCreditHours;
      currentCgpa = (currentCgp + semesterTotalGradePoints) / totalCreditHours;

      setResult({
        semesterGPA: semesterGPA.toFixed(2),
        cgpa: currentCgpa.toFixed(2),
        totalCreditHours,
        cgp: (currentCgp + semesterTotalGradePoints).toFixed(2),
      });
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const getGradePoint = (grade) => {
    switch (grade.toUpperCase()) {
      case "A+":
        return 4.00;
      case "A":
        return 4.0;
      case "A-":
        return 3.67;
      case "B+":
        return 3.33;
      case "B":
        return 3.0;
      case "B-":
        return 2.67;
      case "C+":
        return 2.33;
      case "C":
        return 2.0;
      case "C-":
        return 1.67;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      default:
        throw new Error("Invalid grade: " + grade);
    }
  };

  return (
    <div className="bg-base-100 text-base-content">
      <nav className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl">CGPA CALCULATOR</a>
        <div className="flex-1 justify-end">
          <label className="flex cursor-pointer gap-2">
            <input
              type="checkbox"
              className="toggle theme-controller"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>
        </div>
      </nav>
      <div className="container mx-auto max-w-3xl p-8">
        <div className="input-section mb-4">
          <label className="block mb-2" htmlFor="cgpa">Previous Semester CGPA:</label>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            id="cgpa"
            placeholder="Enter CGPA"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
          />
          <label className="block mb-2" htmlFor="ccc">Previous Semester CCC:</label>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            id="ccc"
            placeholder="Enter CCC"
            value={ccc}
            onChange={(e) => setCcc(e.target.value)}
          />
          <label className="block mb-2" htmlFor="cgp">Previous Semester CGP:</label>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            id="cgp"
            placeholder="Enter CGP"
            value={cgp}
            onChange={(e) => setCgp(e.target.value)}
          />
        </div>
        <div id="course-section" className="mb-4 grid gap-4">
          {courses.map((course, index) => (
            <div className="input-section p-3 border rounded-xl" key={index}>
              <label className="block mb-2 font-bold" htmlFor={`course-name-${index}`}>Course Name {index + 1}:</label>
              <input
                className="input input-bordered w-full mb-2"
                type="text"
                id={`course-name-${index}`}
                placeholder="Enter course name"
                value={course.name}
                onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
              />
              <div className="flex space-x-4 mb-2">
                <div className="flex-1">
                  <label htmlFor={`expected-grade-${index}`} className="block mb-2">Expected Grade:</label>
                  <select
                    className="select select-bordered w-full"
                    id={`expected-grade-${index}`}
                    value={course.grade}
                    onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                  >
                    {gradeOptions.map((option, i) => (
                      <option value={option} key={i}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor={`credit-hours-${index}`} className="block mb-2">Credit Hours:</label>
                  <input
                    className="input input-bordered w-full"
                    type="text"
                    id={`credit-hours-${index}`}
                    placeholder="Enter value"
                    value={course.creditHours}
                    onChange={(e) => handleCourseChange(index, 'creditHours', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button id="calculate-btn" className="btn btn-primary" onClick={calculateCGPA}>Calculate</button>
        </div>
        {result.cgpa && (
          <div id="result" className="mt-8">
            <div className="flex justify-center items-center">
              <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 rounded-lg m-4">
                <div className="stat">
                  <div className="stat-title">GPA</div>
                  <div className="stat-value">{result.semesterGPA}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">CGPA</div>
                  <div className="stat-value">{result.cgpa}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">CCC</div>
                  <div className="stat-value">{result.totalCreditHours}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">CGP</div>
                  <div className="stat-value">{result.cgp}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="bg-base-200 text-base-content p-4 mt-8">
        <div className="w-full max-w-screen-xl mx-auto text-center">
          <span className="block text-sm">© 2024 <a href="https://latiffdanieyal.site/" className="hover:underline">Latiff Danieyal</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
