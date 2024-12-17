import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newStudent = {
      name,
      age,
      gender,
    };

    axios
      .post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        alert("Student added succesfully");
        setName("");
        setAge("");
        setGender("");
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <form onSubmit={sendData}>
      <div class="mb-3" className="container">
        <label for="exampleInputEmail1" class="form-label">
          Student Name
        </label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter Student Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Student Age
        </label>
        <input
          type="text"
          class="form-control"
          id="age"
          placeholder="Enter Student Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Student Gender
        </label>
        <input
          type="text"
          class="form-control"
          id="gender"
          placeholder="Enter Student Gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
