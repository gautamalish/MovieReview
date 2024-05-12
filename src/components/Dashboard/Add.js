import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/firestore';

const Add = ({ employees, setEmployees, setIsAdding,getMovieData }) => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [director, setDirector] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!title ||  !review || !director || !releaseDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      title,
      review,
      director,
      releaseDate,
    };

    employees.push(newEmployee);
    try {
      const docRef = await addDoc(collection(db, "movie"), {
        ...newEmployee
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setEmployees(employees);
    setIsAdding(false);
    getMovieData()
    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${title}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Review</h1>
        <label htmlFor="firstName">Movie Title</label>
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
