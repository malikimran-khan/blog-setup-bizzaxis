import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import InsertData from './InsertData';
import FetchData from './FetchData';
import './App.css';
import Home from './Home';
import BlogDetail from './BlogDetail';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
          <Route path="/" element={<Home/>}></Route>
            <Route path="/insert" element={<InsertData />} />
            <Route path="/show" element={<FetchData />} />
            <Route path='/blog-detail' element={<BlogDetail/>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
