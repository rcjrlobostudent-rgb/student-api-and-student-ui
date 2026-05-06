import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ onStudentAdded, editingStudent, setEditingStudent }) => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');

    useEffect(() => {
        if (editingStudent) {
            setName(editingStudent.name);
            setCourse(editingStudent.course);
        } else {
            setName('');
            setCourse('');
        }
    }, [editingStudent]);

    // Part 2: Add Student (POST) or Part 5: Update Student (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingStudent) {
                await axios.put(`http://localhost:5000/api/students/${editingStudent._id}`, { name, course });
                setEditingStudent(null);
            } else {
                await axios.post('http://localhost:5000/api/students', { name, course });
            }
            setName('');
            setCourse('');
            if (onStudentAdded) onStudentAdded(); // Refresh list
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    return (
        <div>
            <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                />
                <button type="submit">{editingStudent ? 'Update Student' : 'Add Student'}</button>
                {editingStudent && <button type="button" onClick={() => setEditingStudent(null)}>Cancel</button>}
            </form>
        </div>
    );
};

export default StudentForm;