import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Component/HomePage';
import Navbar from './NavBar';
import BookDetail from './Component/BookDetail';
import SearchBooks from './Component/Search';
import Explore from './Component/Explore';
import TopicPage from './Component/TopicPage';
import Read from './Component/Read';
import BookifyAI from './Component/BookifyAi';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/bookify-ai/:id" element={<BookifyAI />} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/reader" element={<Read />} />
        <Route path="/subject/:subject" element={<TopicPage />} />

      </Routes>
    </Router>
  );
}

export default App;