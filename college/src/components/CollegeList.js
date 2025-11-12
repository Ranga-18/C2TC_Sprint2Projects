import React from 'react';
import './CollegeList.css';

const CollegeList = ({ colleges, fetchColleges, setEditingCollege }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/college/${id}`, { method: 'DELETE' });
      fetchColleges();
    } catch (error) {
      console.error('Error deleting college:', error);
    }
  };

  return (
    <div className="college-list-container">
      <h2>College Records</h2>
      <div className="college-grid">
        {colleges.length === 0 ? (
          <p>No colleges found.</p>
        ) : (
          colleges.map((college) => (
            <div key={college.collegeId} className="college-card">
              <h3>{college.collegeName}</h3>
              <p><strong>Location:</strong> {college.location}</p>
              <p><strong>Dean:</strong> {college.dean}</p>
              <p><strong>Contact:</strong> {college.contactNumber}</p>
              <p><strong>Email:</strong> {college.email}</p>
              <p><strong>Accreditation:</strong> {college.accreditation}</p>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingCollege(college)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(college.collegeId)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollegeList;
