import React from 'react';

const Table = ({ employees, handleEdit, handleDelete }) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

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
            employees.map((employee, i) => (
              
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
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
