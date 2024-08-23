import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './BookList';
import AddBook from './AddBook';
import EditBook from './EditBook';
import ConfirmDelete from './ConfirmDelete';
import { BookProvider } from './BookContext';
import './styles.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-brand-container"></div>
            <div className="collapse navbar-collapse justify-content-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Book</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/delete/:id" element={<ConfirmDelete />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;