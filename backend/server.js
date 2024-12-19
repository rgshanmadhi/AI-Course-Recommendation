// Import required dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize the express app
const app = express();

// Set the port for your server to run (3000)
const PORT = 5000;

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(cors()); // This allows all incoming requests from any origin

// Middleware to serve static files (your frontend)
app.use(express.static(path.join(__dirname, 'client/build'))); // Change 'client/build' if you have a different folder name

// Static course data with courses from Backend, Data Science, Design, and Mobile Development
const courses = {
  frontend: [
    { id: 1, title: 'JavaScript Basics', description: 'Learn the fundamentals of JavaScript.', videoLink: 'https://example.com/js-video' },
    { id: 2, title: 'HTML & CSS Fundamentals', description: 'Master the basics of web development with HTML and CSS.', videoLink: 'https://example.com/html-css-video' },
    { id: 3, title: 'React for Beginners', description: 'Learn the basics of React, a popular JavaScript library.', videoLink: 'https://example.com/react-video' },
  ],
  backend: [
    { id: 7, title: 'Node.js and Express', description: 'Learn how to build backend services with Node.js and Express.', videoLink: 'https://example.com/nodejs-video' },
    { id: 8, title: 'Building REST APIs with Node.js', description: 'Learn how to create REST APIs with Node.js and Express.', videoLink: 'https://example.com/rest-api-video' },
    { id: 9, title: 'Docker for Backend Developers', description: 'Learn how to containerize your backend apps using Docker.', videoLink: 'https://example.com/docker-video' },
    { id: 10, title: 'GraphQL Basics', description: 'Learn the fundamentals of GraphQL for API development.', videoLink: 'https://example.com/graphql-video' },
  ],
  dataScience: [
    { id: 13, title: 'Python for Data Science', description: 'Learn Python for data analysis and machine learning.', videoLink: 'https://example.com/python-video' },
    { id: 14, title: 'Data Analysis with Pandas', description: 'Master data analysis using Python and Pandas.', videoLink: 'https://example.com/pandas-video' },
    { id: 15, title: 'Machine Learning with Scikit-Learn', description: 'Learn machine learning using the Scikit-Learn library.', videoLink: 'https://example.com/scikit-learn-video' },
    { id: 16, title: 'Deep Learning with TensorFlow', description: 'Learn how to build deep learning models using TensorFlow.', videoLink: 'https://example.com/tensorflow-video' },
  ],
  design: [
    { id: 19, title: 'UI/UX Design Principles', description: 'Master the principles of UI/UX design.', videoLink: 'https://example.com/uiux-design' },
    { id: 20, title: 'Introduction to Figma', description: 'Learn how to use Figma for UI/UX design.', videoLink: 'https://example.com/figma-video' },
    { id: 21, title: 'Wireframing with Sketch', description: 'Learn wireframing and prototyping with Sketch.', videoLink: 'https://example.com/sketch-video' },
    { id: 22, title: 'Responsive Web Design', description: 'Master responsive design techniques for websites.', videoLink: 'https://example.com/responsive-web-design' },
  ],
  mobileDevelopment: [
    { id: 25, title: 'React Native Essentials', description: 'Cross-platform mobile development with React Native.', videoLink: 'https://example.com/react-native' },
    { id: 26, title: 'Flutter for Beginners', description: 'Learn how to build cross-platform mobile apps with Flutter.', videoLink: 'https://example.com/flutter-video' },
    { id: 27, title: 'Kotlin for Android Development', description: 'Learn Android development using Kotlin.', videoLink: 'https://example.com/kotlin-android' },
    { id: 28, title: 'Building Mobile Apps with Swift', description: 'Learn iOS mobile app development using Swift.', videoLink: 'https://example.com/swift-video' },
  ],
};

// Middleware to serve static files (frontend)
app.use(express.static(path.join(__dirname, 'client/build')));

// Define a route to serve the course data
app.get('/api/courses', (req, res) => {
  const allCourses = Object.values(courses).flat();
  res.json(allCourses);
});

// Define a route to serve courses by domain
app.get('/api/courses/:domain', (req, res) => {
  const { domain } = req.params;

  if (!courses[domain]) {
    return res.status(404).json({ message: 'Domain not found' });
  }

  res.json(courses[domain]);
});

// Define a route to fetch a specific course by ID
app.get('/api/courses/:domain/:id', (req, res) => {
  const { domain, id } = req.params;
  const courseId = parseInt(id);

  if (!courses[domain]) {
    return res.status(404).json({ message: 'Domain not found' });
  }

  const course = courses[domain].find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  res.json(course);
});

// For all other routes, serve the frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html')); // Adjust if your build folder is different
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

