import React from "react";
import { useParams, Link } from "react-router-dom";

const CoursePage = ({ courses }) => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div>
        <h2>Course Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="course-details">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <a href={course.url} target="_blank" rel="noopener noreferrer" className="course-link">
        Go to Course
      </a>
      <br />
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
};

export default CoursePage;
