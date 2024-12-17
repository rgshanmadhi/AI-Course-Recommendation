import React, { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  const [userInput, setUserInput] = useState(''); // State to store user input
  const [recommendations, setRecommendations] = useState([]); // State to store fetched recommendations

  // Handle input changes
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Fetch recommendations from the backend
  const handleRecommendation = () => {
    fetch('http://localhost:5000/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput }),
    })
      .then((response) => response.json())
      .then((data) => setRecommendations(data))
      .catch((error) => console.error('Error fetching recommendations:', error));
  };

  return (
    <div className="home-page">
      <header>
        <h1>AI Course Recommendation</h1>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Search for courses or your interests"
        />
        <button onClick={handleRecommendation}>Search</button>
      </header>

      <main>
        {/* Section for Featured Courses */}
        <h2>Featured Courses</h2>
        <div className="course-cards">
          {/* Example static featured courses */}
          <div className="course-card">
            <img src="course1.jpg" alt="Course 1" />
            <h3>Machine Learning Basics</h3>
            <p>Learn the fundamentals of machine learning...</p>
            <a href="#">Enroll Now</a>
          </div>
        </div>

        {/* Section for Recommended Courses */}
        <h2>Recommended for You</h2>
        <div className="course-cards">
          {recommendations.map((course) => (
            <div className="course-card" key={course.id}>
              <img src={course.imageUrl} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <a href={course.link}>Enroll Now</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
