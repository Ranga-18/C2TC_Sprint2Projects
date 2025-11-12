import React, { useState, useEffect } from 'react';
import './CollegeForm.css';

const CollegeForm = ({ fetchColleges, editingCollege, setEditingCollege }) => {
  const [collegeName, setCollegeName] = useState('');
  const [location, setLocation] = useState('');
  const [dean, setDean] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [accreditation, setAccreditation] = useState('');

  useEffect(() => {
    if (editingCollege) {
      setCollegeName(editingCollege.collegeName);
      setLocation(editingCollege.location);
      setDean(editingCollege.dean);
      setContactNumber(editingCollege.contactNumber);
      setEmail(editingCollege.email);
      setAccreditation(editingCollege.accreditation);
    } else {
      setCollegeName('');
      setLocation('');
      setDean('');
      setContactNumber('');
      setEmail('');
      setAccreditation('');
    }
  }, [editingCollege]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const college = { collegeName, location, dean, contactNumber, email, accreditation };

    try {
      if (editingCollege) {
        await fetch(`http://localhost:8080/college/${editingCollege.collegeId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(college),
        });
      } else {
        await fetch('http://localhost:8080/college', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(college),
        });
      }
      fetchColleges();
      setEditingCollege(null);
    } catch (error) {
      console.error('Error saving college:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingCollege ? 'Edit College' : 'Add College'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="College Name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Dean" value={dean} onChange={(e) => setDean(e.target.value)} required />
        <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Accreditation" value={accreditation} onChange={(e) => setAccreditation(e.target.value)} required />
        <button type="submit">{editingCollege ? 'Update College' : 'Add College'}</button>
      </form>
    </div>
  );
};

export default CollegeForm;
