import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateStudent() {
  const { id } = useParams(); // Extract student ID from URL
  const navigate = useNavigate(); // Hook to navigate between pages
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    // Fetch the student details to pre-fill the form
    axios
      .get(`http://localhost:8070/student/get/${id}`)
      .then((res) => {
        console.log("API Response:", res.data); // Log the response to check the structure
        const { name, age, gender } = res.data.data;
        setFormData({ name, age, gender });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/student/update/${id}`, formData)
      .then(() => {
        alert("Student updated successfully!");
        navigate("/"); // Redirect to the AllStudents page
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <h3>Update Student</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter new name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter new age"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <input
            type="text"
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Enter new gender"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}
