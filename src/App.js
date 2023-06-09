import './App.css';
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  HashRouter
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      message: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000);
  }

  return (
    <>
      <NoteState>
        <HashRouter> {/* basename='/Note-Keeping-Application' */}
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home  showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </HashRouter>
      </NoteState>
    </>
  );
}

export default App;
