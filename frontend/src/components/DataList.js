import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer along with toast function
import "react-toastify/dist/ReactToastify.css"; // Import the necessary styles for the toast
import "./DataList.css"; // Importing custom CSS file for styles

const DataList = ({ data, fetchData, setSelectedData }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      toast.success("Data deleted successfully!"); // Show success toast
      fetchData();  // Re-fetch data after deletion
    } catch (error) {
      toast.error("Error deleting data"); // Show error toast
    }
  };

  return (
    <div className="data-list-container">
      <h2 className="title">Data List</h2>
      <ul className="data-list">
        {data.map((item) => (
          <li className="data-item" key={item._id}>
            <div className="data-name">{item.name}</div>
            <div className="action-buttons">
              <button 
                className="edit-button" 
                onClick={() => setSelectedData(item)}>
                Edit
              </button>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Toast container to render the notifications */}
      <ToastContainer />
    </div>
  );
};

export default DataList;
