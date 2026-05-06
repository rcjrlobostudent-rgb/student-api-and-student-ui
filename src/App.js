import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleStudentAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="App">
      <h1>Student Management System</h1>
      <StudentForm onStudentAdded={handleStudentAdded} editingStudent={editingStudent} setEditingStudent={setEditingStudent} />
      <StudentList key={refreshKey} onEditStudent={handleEditStudent} />
    </div>
  );
}

export default App;
