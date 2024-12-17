import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  function getStudents() {
    axios
      .get("http://localhost:8070/student/display")
      .then((res) => {
        setStudents(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:8070/student/delete/${id}`)
      .then((res) => console.log("Succesfully deleted" + res.data))
      .then(() => getStudents())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h3>All Students</h3>
      {(() => {
        if (students.length > 0) {
          return (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.gender}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/update/${student._id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-del"
                        onClick={() => deleteStudent(student._id)}
                        style={{ backgroundColor: "red", marginLeft: "5px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        } else {
          return <p>No students found.</p>;
        }
      })()}
    </div>
  );
}
