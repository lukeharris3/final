import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/main.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/golfcourses');
        setCourses(response.data);
        console.log('Fetched courses:', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (course.name && course.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (course.address && course.address.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (course.phone && course.phone.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  console.log('Filtered courses:', filteredCourses);

  return (
    <div className="courses-page">
      <h1>Courses</h1>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="course-info">
              <div className="course-card">
                <img src={course.image_url} alt={course.name} className="course-image" />
                <div className="course-info">
                  <h3 className="course-name">{course.name}</h3>
                  <p className="course-address">{course.address}</p>
                  <p className="course-phone">{course.phone}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
