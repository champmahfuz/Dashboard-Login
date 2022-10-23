import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard';
import UserDashboard from './Pages/Dashboard/UserDashboard/UserDashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Pages/Shared/Navbar/Navbar';
import RequireAuth from './Pages/Login/RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminDashboard" element={<RequireAuth>
          <AdminDashboard />
        </RequireAuth>} />
        <Route path="/userDashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
