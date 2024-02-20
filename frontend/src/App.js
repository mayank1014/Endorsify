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
import StudentHomeProfessorProfile from './Pages/StudentHomeProfessorProfile';
import StudentApplyLOR from './Pages/StudentAppyLOR';
import ChangePassword from './Pages/ChangePassword';
import StudentEdit from './Pages/StudentEdit';

function App() {

  const isAuthenticatedUser = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !== "admin@gmail.com";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="register" element={<Register />} />
          <Route path="register/student" element={<StudentRegister />} />
          <Route path="register/professor" element={<ProfessorRegister />} />
          <Route path="register/university" element={<UniversityRegister />} />
          {isAuthenticatedUser && <Route path="student/home" element={<StudentHomePage />} />}
          {isAuthenticatedUser && <Route path="student/edit" element={<StudentEdit />} />}
          {isAuthenticatedUser && <Route path="student/apply" element={<StudentApplyLOR />} />}
          {isAuthenticatedUser && <Route path="student/professor/:id" element={<StudentHomeProfessorProfile />} />}
          {isAuthenticatedUser && <Route path="/changepassword" element={<ChangePassword />} />}
          <Route path="professor/home" element={<ProfessorHomePage />} />
          <Route path="university/home" element={<UniversityHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
