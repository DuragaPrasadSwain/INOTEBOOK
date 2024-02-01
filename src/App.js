import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home';
import About from './components/about';
import Navbar from './components/navbar';
import NoteState from './context/notes/noteState';
import Alert from './components/alert';
import AlertState from './context/alerts/alertState';
import Login from './components/login';
import Signin from './components/signin';


function App() {
  
  return (
    <>
      <NoteState> 
      <AlertState>
      <Router>

        <Navbar />
        
        <Alert/>

        <Routes>

          <Route exact path="/home" element={<Home />}></Route>

          <Route exact path="/about" element={<About />}></Route>

          <Route exact path="/" element={<Login/>}></Route>

          <Route exact path="/signin" element={<Signin/>}></Route>

        </Routes>

      </Router>
      </AlertState>
      </NoteState>
    </>
  );
}

export default App;
