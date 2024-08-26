import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import History from './components/History';

const gradeOptions = ["SELECT", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

function App() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses'));
    return savedCourses || [{ name: '', grade: '', creditHours: '' }];
  });
  const [cgpa, setCgpa] = useState(localStorage.getItem('cgpa') || '');
  const [ccc, setCcc] = useState(localStorage.getItem('ccc') || '');
  const [cgp, setCgp] = useState(localStorage.getItem('cgp') || '');
  const [result, setResult] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history')) || []);
  const [previousSemesters, setPreviousSemesters] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('previousSemesters'));
    return saved || [{ cgpa: '' }];
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('cgpa', cgpa);
  }, [cgpa]);

  useEffect(() => {
    localStorage.setItem('ccc', ccc);
  }, [ccc]);

  useEffect(() => {
    localStorage.setItem('cgp', cgp);
  }, [cgp]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('previousSemesters', JSON.stringify(previousSemesters));
  }, [previousSemesters]);

  const handleCourseChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

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

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: '', creditHours: '' }]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const calculateCGPA = () => {
    try {
      let totalSemesters = previousSemesters.length + 1; // Including current semester
      let totalGPA = 0;

      // Calculate total GPA from previous semesters
      previousSemesters.forEach(semester => {
        const semesterCgpa = parseFloat(semester.cgpa);

        if (isNaN(semesterCgpa)) {
          throw new Error("Invalid CGPA input in previous semesters");
        }

        totalGPA += semesterCgpa;
      });

      // Calculate current semester GPA
      let currentSemesterCreditHours = 0;
      let currentSemesterGradePoints = 0;

      courses.forEach(course => {
        let { grade, creditHours } = course;
        creditHours = parseFloat(creditHours);

        if (!isNaN(creditHours) && creditHours > 0 && gradeOptions.includes(grade)) {
          let gradePoint = getGradePoint(grade) * creditHours;
          currentSemesterCreditHours += creditHours;
          currentSemesterGradePoints += gradePoint;
        }
      });

      let currentSemesterGPA = currentSemesterGradePoints / currentSemesterCreditHours;
      totalGPA += currentSemesterGPA;

      // Calculate overall CGPA
      let overallCGPA = totalGPA / totalSemesters;

      const newResult = {
        semesterGPA: currentSemesterGPA.toFixed(2),
        cgpa: overallCGPA.toFixed(2),
        totalCreditHours: currentSemesterCreditHours,
        cgp: currentSemesterGradePoints.toFixed(2),
        date: new Date().toLocaleString(),
        courses: courses.filter(course => course.name && course.grade && course.creditHours)
      };

      setResult(newResult);

      // Add to history
      const newHistory = [newResult, ...history.slice(0, 9)]; // Keep only the last 10 entries
      setHistory(newHistory);
      localStorage.setItem('history', JSON.stringify(newHistory));
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
    <Router>
      <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
        <nav className="navbar bg-base-100">
          <a className="btn btn-ghost text-xl">CGPA CALCULATOR</a>
          <div className="flex-1 justify-end">
            <ul className="menu menu-horizontal px-1">
              <li className='mr-4'><Link to="/">Home</Link></li>
              <li className='mr-4'><Link to="/history">History</Link></li>
            </ul>
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
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
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </label>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div className="container mx-auto max-w-3xl p-8">
                <div className="flex flex-col input-section mb-4 justify-center">
                  <h2 className="text-xl font-bold mb-2">Previous Semesters</h2>
                  {previousSemesters.map((semester, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">Semester {index + 1}</h3>
                        {index > 0 && (
                          <button className="btn btn-circle btn-sm" onClick={() => removeSemester(index)}>X</button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
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
                    </div>
                  ))}
                  <button className="btn btn-primary" onClick={addSemester}>Add Semester</button>
                </div>
                <div id="course-section" className="flex flex-col justify-center mb-10">
                  <h2 className="text-xl font-bold mb-2">Current Semester Courses</h2>
                  {courses.map((course, index) => (
                    <div className="input-section p-3 border rounded-xl mb-4" key={index}>
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
                      {index > 0 && (
                        <div className="flex justify-end">
                          <button className="btn btn-error mt-2" onClick={() => removeCourse(index)}>Remove Course</button>
                        </div>
                      )}
                    </div>
                  ))}
                  <button className="btn btn-primary" onClick={addCourse}>Add Course</button>
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
                      </div>
                    </div>
                  </div>
                )}
              </div>
            } />
            <Route path="/history" element={<History history={history} />} />
          </Routes>
        </main>

        <footer className="bg-base-200 text-base-content p-4 mt-auto">
          <div className="w-full max-w-screen-xl mx-auto text-center">
            <span className="block text-sm">© 2024 <a href="https://latiffdanieyal.site/" className="hover:underline">Latiff Danieyal</a>. All Rights Reserved.</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;