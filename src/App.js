import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Home Component with Search Bar
const Home = ({ onSearch, searchTerm }) => {
  return (
    <div className="page-container">
      <h1 className="welcome-section">Welcome to My Course App</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for courses..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button onClick={() => onSearch(searchTerm)}>Search</button>
      </div>
    </div>
  );
};

// Courses Component - Displays filtered courses
const Courses = ({ courses }) => {
  return (
    <div className="courses-container">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3>{course.title}</h3>
          </div>
        ))
      ) : (
        <p>No courses found</p>
      )}
    </div>
  );
};

// Account, Subscription, and Contact Components
const Account = () => <div className="page-container">Your Account Details</div>;
const Subscription = () => (
  <div className="page-container">Subscription Info</div>
);
const Contact = () => <div className="page-container">Contact Us</div>;

function App() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]); // To store courses from the backend

  // Fetch all courses from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Filter courses based on the search term
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Theme Toggle
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Menu Toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className={theme === "dark" ? "dark-mode" : "light-mode"}>
        <header>
          <nav>
            <div className="nav-logo">My Course App</div>
            <div className="hamburger-menu" onClick={toggleMenu}>
              &#9776;
            </div>
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/subscription">Subscription</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <div className="theme-toggle-container" onClick={toggleTheme}>
              <div
                className={`theme-toggle ${theme === "dark" ? "dark" : ""}`}
              ></div>
            </div>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<Home onSearch={handleSearch} searchTerm={searchTerm} />}
          />
          <Route
            path="/courses"
            element={<Courses courses={filteredCourses} />}
          />
          <Route path="/account" element={<Account />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer>
          <p>Contact us at support@mycourseapp.com</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
