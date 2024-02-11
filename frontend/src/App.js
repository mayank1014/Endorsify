import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from './Pages/AuthForm';
import Register from './Pages/Register';
import StudentRegister from './Pages/StudentRegister';
import ProfessorRegister from './Pages/ProfessorRegister';
import UniversityRegister from './Pages/UniversityRegister';
import StudentHomePage from './Pages/StudentHomePage';
import ProfessorHomePage from './Pages/ProfessorHomePage';
import UniversityHomePage from './Pages/UniversityHomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="register" element={<Register />} />
          <Route path="register/student" element={<StudentRegister />} />
          <Route path="register/professor" element={<ProfessorRegister />} />
          <Route path="register/university" element={<UniversityRegister />} />
          <Route path="student/home" element={<StudentHomePage />} />
          <Route path="professor/home" element={<ProfessorHomePage />} />
          <Route path="university/home" element={<UniversityHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
