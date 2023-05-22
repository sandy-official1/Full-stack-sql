import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [tableNo, setTableNo] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3006/api/get");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3006/api/add", {
        name,
        food,
        tableNo,
      });
      fetchData(); // Fetch data again after adding
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/api/delete/${id}`);
      fetchData(); // Fetch data again after deleting
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, newName, newFood, newTableNo) => {
    try {
      await axios.put(`http://localhost:3006/api/update/${id}`, {
        name,
        food,
        tableNo,
      });
      console.log("Data edited:", { id, name, food, tableNo });
      fetchData(); // Fetch data again after editing
    } catch (error) {
      console.log("Edit error:", error);
    }
  };

  return (
    <div>
      <h1>Restaurant Details</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Food"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
        <input
          type="text"
          placeholder="Table No"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Food</th>
            <th>Table No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.food}</td>
              <td>{item.tableNo}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <button
                  onClick={() =>
                    handleEdit(item.id, "newName", "newFood", "newTableNo")
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
