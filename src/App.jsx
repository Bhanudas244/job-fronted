import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import JobForm from './pages/JobForm';
import Navbar from './components/Navbar';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/create-job" element={<PrivateRoute><JobForm /></PrivateRoute>} />
        {/* <Route path="/create-job" element={<JobForm />} /> */}
        <Route path="/edit-job/:id" element={<PrivateRoute><JobForm editMode={true} /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;