import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  // remove access token and refresh token as soon as logout attempt
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  // if user wants to register...
  // clear the access token and refresh token first
  // so that these won't accidently be sent to the registered route
  localStorage.clear();
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* you cannot access Home route unless you have access token */}
        {/* because it is a protected route */}
        <Route  path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<RegisterAndLogout />} />

        {/* any other routes, results to 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
