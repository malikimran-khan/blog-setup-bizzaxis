import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import InsertData from './InsertData';
import FetchData from './FetchData';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<InsertData />} />
            <Route path="/show" element={<FetchData />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
