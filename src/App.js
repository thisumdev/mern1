import "./App.css";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AllStudents from "./components/AllStudents";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/add" exact Component={AddStudent} />
          <Route path="/" exact Component={AllStudents} />
          <Route path="/update/:id" exact element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
