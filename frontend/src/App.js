import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from './Pages/AuthForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
