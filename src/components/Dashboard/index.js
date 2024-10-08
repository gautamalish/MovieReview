import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc,getDocs, where } from "firebase/firestore";
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { db } from '../../config/firestore';
import { doc, deleteDoc } from "firebase/firestore";
const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  
  async function getMovieData(){
    const querySnapshot = await getDocs(collection(db, "movie"));
    const movies=querySnapshot.docs.map(doc=>({id:doc.id, ...doc.data()}))
    setEmployees(movies)
  }
  useEffect(() => {
    getMovieData()
  }, []);

  const handleEdit = id => {
    const [employee] = employees.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [employee] = employees.filter(employee => employee.id == id);
        deleteDoc(doc(db, "movie",id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.title}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(employee => employee.id !== id);
        console.log(employeesCopy)
        setEmployees(employeesCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
            setSortBy={setSortBy}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            sortBy={sortBy}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
          getMovieData={getMovieData}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
          getMovieData={getMovieData}
        />
      )}
    </div>
  );
};

export default Dashboard;
