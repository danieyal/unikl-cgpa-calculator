import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Calculator from './components/Calculator';
import History from './components/History';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history')) || []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Calculator history={history} setHistory={setHistory} />} />
            <Route path="/history" element={<History history={history} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;