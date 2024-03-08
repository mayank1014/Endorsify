import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from './Pages/AuthForm';
import Register from './Pages/Register';
import StudentRegister from './Pages/StudentRegister';
import ProfessorRegister from './Pages/ProfessorRegister';
import UniversityRegister from './Pages/UniversityRegister';
import Student from './Pages/Student';
import ProfessorHomePage from './Pages/ProfessorHomePage';
import UniversityHomePage from './Pages/UniversityHomePage';
<<<<<<< Updated upstream
import StudentHomeProfessorProfile from './Pages/StudentHomeProfessorProfile';
import ProfessorHomeStudentProfile from './Pages/ProfessorHomeStudentProfile';
=======
import StudentProfessorProfile from './Pages/StudentProfessorProfile';
>>>>>>> Stashed changes
import StudentApplyLOR from './Pages/StudentAppyLOR';
import ChangePassword from './Pages/ChangePassword';
import StudentEdit from './Pages/StudentEdit';
import ProfessorEdit from './Pages/ProfessorEdit';
import StudentHome from './Pages/StudentHome';

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
          
          <Route path="/student" element={<Student />}>
            <Route path="home" element={<StudentHome />} />
            <Route path="edit" element={<StudentEdit />} />
            <Route path="apply" element={<StudentApplyLOR />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="professor/:id" element={<StudentProfessorProfile />} />
          </Route>

          {/* {isAuthenticatedUser && <Route path="student/home" element={<StudentHomePage />} />}
          {isAuthenticatedUser && <Route path="student/edit" element={<StudentEdit />} />}
          {isAuthenticatedUser && <Route path="student/apply" element={<StudentApplyLOR />} />}
          {isAuthenticatedUser && <Route path="student/professor/:id" element={<StudentHomeProfessorProfile />} />}
          {isAuthenticatedUser && <Route path="/changepassword" element={<ChangePassword />} />} */}

          {isAuthenticatedUser && <Route path="professor/home" element={<ProfessorHomePage />} /> }
          {isAuthenticatedUser && <Route path="professor/edit" element={<ProfessorEdit />} />}
          {isAuthenticatedUser && <Route path="professor/home/student" element={<ProfessorHomeStudentProfile />} />}
          <Route path="university/home" element={<UniversityHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;