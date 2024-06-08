import Login from './components/Login-signup/Login';
import Register from './components/Login-signup/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Register />}></Route>
        <Route path='/signin' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;