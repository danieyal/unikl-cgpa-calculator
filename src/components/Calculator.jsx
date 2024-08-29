import React, { useState, useEffect } from 'react';
import PreviousSemesters from './PreviousSemesters';
import CurrentSemester from './CurrentSemester';
import Results from './Results';

function Calculator({ history, setHistory }) {
  const [courses, setCourses] = useState(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses'));
    return savedCourses || [{ name: '', grade: '', creditHours: '' }];
  });
  const [previousSemesters, setPreviousSemesters] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('previousSemesters'));
    return saved || [{ cgpa: '' }];
  });
  const [result, setResult] = useState({});

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('previousSemesters', JSON.stringify(previousSemesters));
  }, [previousSemesters]);

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

  return (
    <div className="container mx-auto max-w-3xl">
      <PreviousSemesters
        previousSemesters={previousSemesters}
        setPreviousSemesters={setPreviousSemesters}
      />
      <CurrentSemester
        courses={courses}
        setCourses={setCourses}
      />
      <div className="flex justify-center mb-6">
        <button className="btn btn-primary w-full sm:w-auto" onClick={calculateCGPA}>Calculate</button>
      </div>
      {result.cgpa && <Results result={result} />}
    </div>
  );
}

export default Calculator;