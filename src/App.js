import './App.css';
import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import NoteState from './contexts/notes/NoteState';
import About from './Components/About';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';

function App() {
    const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    // Auto dismiss after 3 sec
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <NoteState>
      <Router>
        <MyNavbar />
        <Alert alert={alert} onClose={() => setAlert(null)} />
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="/Login" element={<Login showAlert={showAlert} />} />
          <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
