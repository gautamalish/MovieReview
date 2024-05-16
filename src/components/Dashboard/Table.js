import React from 'react';
import { useState } from 'react';
const Table = ({ employees, handleEdit, handleDelete,sortBy }) => {

  const sortEmployees = (a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  const sortedEmployees = [...employees].sort(sortEmployees);

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Rating</th>
            <th>Director</th>
            <th>Release Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            sortedEmployees.map((employee, i) => (
              
              <tr key={employee.id}>
                <td>{employee.title}</td>
                <td>{employee.review}</td>
                <td>{employee.director}</td>
                <td>{employee.releaseDate}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id) }
                    className="button muted-button"
                    
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                    
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Review</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
