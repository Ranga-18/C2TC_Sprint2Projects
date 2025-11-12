import React, { useState, useEffect } from 'react';
import './App.css';
import CollegeForm from './components/CollegeForm';
import CollegeList from './components/CollegeList';

const App = () => {
  const [colleges, setColleges] = useState([]);
  const [editingCollege, setEditingCollege] = useState(null);

  const fetchColleges = async () => {
    try {
      const response = await fetch('http://localhost:8080/college');
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <div className="App">
      <h1>Placement Management - College Module</h1>
      <CollegeForm fetchColleges={fetchColleges} editingCollege={editingCollege} setEditingCollege={setEditingCollege} />
      <CollegeList colleges={colleges} fetchColleges={fetchColleges} setEditingCollege={setEditingCollege} />
    </div>
  );
};

export default App;
