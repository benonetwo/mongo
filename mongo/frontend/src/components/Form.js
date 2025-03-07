import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ selectedData, fetchData, setSelectedData }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedData) {
      setName(selectedData.name);
    } else {
      setName("");
    }
  }, [selectedData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedData) {
        // Update existing data
        await axios.put(`http://localhost:5000/api/update/${selectedData._id}`, { name });
        alert("Data updated successfully!");
      } else {
        // Add new data
        await axios.post("http://localhost:5000/api/add", { name });
        alert("Data added successfully!");
      }
      setName("");  // Clear input
      setSelectedData(null);  // Clear selected data for editing
      fetchData();  // Re-fetch data after adding/updating
    } catch (error) {
      alert("Error saving data");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
      />
      <button type="submit">{selectedData ? "Update" : "Add"}</button>
    </form>
  );
};

export default Form;
