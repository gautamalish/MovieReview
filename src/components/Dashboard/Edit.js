import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../../config/firestore';
const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing,getMovieData }) => {
  const id = selectedEmployee.id;

  const [title, setTitle] = useState(selectedEmployee.title);
  const [review, setReview] = useState(selectedEmployee.review);
  const [director, setDirector] = useState(selectedEmployee.director);
  const [releaseDate, setReleaseDate] = useState(selectedEmployee.releaseDate);
  console.log(selectedEmployee)
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !review || !director || !releaseDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const employee = {
      title,
      review,
      director,
      releaseDate,
    };

    await setDoc(doc(db,"movie",id),{
      ...employee
    })
    
    setEmployees(employees);
    setIsEditing(false);
    getMovieData()
    
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.title}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Review</h1>
        <label htmlFor="firstName">Title</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="email">Review</label>
        <input
          id="email"
          type="number"
          name="email"
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <label htmlFor="salary">Director</label>
        <input
          id="salary"
          type="text"
          name="salary"
          value={director}
          onChange={e => setDirector(e.target.value)}
        />
        <label htmlFor="date">Release Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={releaseDate}
          onChange={e => setReleaseDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
