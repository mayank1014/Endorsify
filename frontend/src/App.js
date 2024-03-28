import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from './Pages/AuthForm';
import Register from './Pages/Register';
import StudentRegister from './Pages/StudentRegister';
import ProfessorRegister from './Pages/ProfessorRegister';
import UniversityRegister from './Pages/UniversityRegister';
import ProfessorHomePage from './Pages/ProfessorHomePage';
import ProfessorHomeStudentProfile from './Pages/ProfessorHomeStudentProfile';
import Student from './Pages/Student';
import StudentProfessorProfile from './Pages/StudentProfessorProfile';
import StudentApplyLOR from './Pages/StudentAppyLOR';
import ChangePassword from './Pages/ChangePassword';
import StudentEdit from './Pages/StudentEdit';
import ProfessorEdit from './Pages/ProfessorEdit';
import StudentHome from './Pages/StudentHome';
import UniversityPage from './Pages/University';
import UniversitySubscription from './Pages/UniversitySubscription';
import UniversityEdit from './Pages/UniversityEdit';
import UniversityProfessors from './Pages/UniversityProfessors';
import UniversityStudents from './Pages/UniversityStudents';
import UniversityProfessorProfile from './Pages/UniversityProfessorProfile';
import Subscription from './Pages/Subscription';
import Success from './Pages/Success';
import Cancel from './Pages/Cancel';
import StudentRequests from './Pages/StudentRequests';
import ProfessorHomeStudentList from './Pages/ProfessorHomeStudentList';
import ProfessorStudentLorUpdate from './Pages/ProfessorStudentLorUpdate';
import ViewDocs from './Pages/ViewDocs';
import UploadDocs from './Pages/UploadDocs';
import ForgotPassword from './Pages/ForgotPassword';

function App() {

  const isAuthenticatedUser = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !== "admin@gmail.com";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          {/* <Route path="/" element={<ViewDocs />} />
          <Route path="/u" element={<UploadDocs />} /> */}

          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<AuthForm />} />
          <Route path="register" element={<Register />} />
          <Route path="register/student" element={<StudentRegister />} />
          <Route path="register/professor" element={<ProfessorRegister />} />
          <Route path="register/university" element={<UniversityRegister />} />
          <Route path="register/university/subscription" element={<Subscription />} />
          
          <Route path="/student" element={<Student />}>
            <Route path="home" element={<StudentHome />} />
            <Route path="edit" element={<StudentEdit />} />
            <Route path="apply" element={<StudentApplyLOR />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="professor/:id" element={<StudentProfessorProfile />} />
            <Route path="requests" element={<StudentRequests />} />
          </Route>

          <Route path="/changepassword" element={<ChangePassword />} />
         <Route path="/professor/home" element={<ProfessorHomePage />} /> 
           <Route path="professor/edit" element={<ProfessorEdit />} />
         <Route path="professor/student/:id" element={<ProfessorHomeStudentProfile />} />
          <Route path="professor/student/:id/edit" element={<ProfessorStudentLorUpdate />} />
         <Route path="professor/home/student" element={<ProfessorHomeStudentList />} />
          
          <Route path="/university" element={<UniversityPage />}>
            <Route path="students" element={<UniversityStudents />} />
            <Route path="professors" element={<UniversityProfessors />} />
            <Route path="edit" element={<UniversityEdit />} />
            {/* <Route path="lor" element={<StudentApplyLOR />} /> */}
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="subscription" element={<UniversitySubscription />} />
            <Route path="professors/:id" element={<UniversityProfessorProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
