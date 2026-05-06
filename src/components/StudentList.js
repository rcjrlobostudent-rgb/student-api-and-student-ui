import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = ({ refresh, onEditStudent }) => {
    const [students, setStudents] = useState([]);

    // Part 4: Fetch Data (GET)
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Part 6: Delete Student (DELETE)
    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/students/${id}`);
            fetchStudents(); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        if (refresh) {
            fetchStudents();
        }
    }, [refresh]);

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={student._id}>
                        {student.name} - {student.course}
                        <button onClick={() => onEditStudent(student)}>Edit</button>
                        <button onClick={() => deleteStudent(student._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;