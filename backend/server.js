// Import required dependencies
const express = require('express');
const cors = require('cors');

// Initialize the express app
const app = express();

// Set the port for your server to run
const PORT = 5000;

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(cors()); // This allows all incoming requests from any origin

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Sample course data (you can replace this with a database connection later)
let courses = [
  { id: 1, title: 'JavaScript Basics', description: 'Learn the fundamentals of JavaScript.', videoLink: 'https://example.com/js-video' },
  { id: 2, title: 'React for Beginners', description: 'Introduction to building UI with React.', videoLink: 'https://example.com/react-video' },
  { id: 3, title: 'Node.js and Express', description: 'Learn how to build backend services with Node.js.', videoLink: 'https://example.com/nodejs-video' },
  { id: 4, title: 'CSS and HTML', description: 'Learn to style web pages with CSS and HTML.', videoLink: 'https://example.com/css-video' },
  { id: 5, title: 'Python for Data Science', description: 'Learn Python for data analysis and machine learning.', videoLink: 'https://example.com/python-video' },
  { id: 6, title: 'Full Stack Web Development', description: 'Learn front-end and back-end development.', videoLink: 'https://example.com/fullstack-video' },
  { id: 7, title: 'React Native Essentials', description: 'Cross-platform mobile development with React Native.', videoLink: 'https://example.com/react-native' },
  { id: 8, title: 'AWS Cloud Fundamentals', description: 'Introduction to AWS cloud services.', videoLink: 'https://example.com/aws-cloud' },
  { id: 9, title: 'Machine Learning Essentials', description: 'Learn machine learning with Python.', videoLink: 'https://example.com/ml-course' },
  { id: 10, title: 'UI/UX Design Principles', description: 'Master the principles of UI/UX design.', videoLink: 'https://example.com/uiux-design' },
];

// Define a route to fetch all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Define a route for search by title (dynamic search query)
app.get('/api/courses/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredCourses);
});

// Define a route to fetch a specific course by ID
app.get('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  res.json(course);
});

// Define a route to add a new course
app.post('/api/courses', (req, res) => {
  const { title, description, videoLink } = req.body;

  if (!title || !description || !videoLink) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCourse = {
    id: courses.length ? Math.max(...courses.map(course => course.id)) + 1 : 1,
    title,
    description,
    videoLink,
  };

  courses.push(newCourse);

  res.status(201).json(newCourse);
});

// Define a route to update a course by ID
app.put('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const updatedData = req.body;

  const courseIndex = courses.findIndex(c => c.id === courseId);

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  courses[courseIndex] = { ...courses[courseIndex], ...updatedData };
  res.json(courses[courseIndex]);
});

// Define a route to delete a course by ID
app.delete('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);

  const courseIndex = courses.findIndex(c => c.id === courseId);

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  courses.splice(courseIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
