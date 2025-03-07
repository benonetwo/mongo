import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import DataList from "./components/DataList";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  // Fetch data from backend and update state
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get");
      setData(response.data); // Update data state
    } catch (error) {
      console.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, []);

  return (
    <div>
      <h1>CRUD MERN App</h1>
      <Form selectedData={selectedData} fetchData={fetchData} setSelectedData={setSelectedData} />
      <DataList data={data} fetchData={fetchData} setSelectedData={setSelectedData} />
    </div>
  );
}

export default App;
