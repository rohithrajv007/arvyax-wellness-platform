import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Page Components
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';

// Import the ProtectedRoute component
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* --- Protected Routes --- */}
          {/* All routes nested inside this element will be protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-sessions" element={<MySessions />} />
            {/* Use SessionEditor for both creating and editing */}
            <Route path="/session/edit/:id" element={<SessionEditor />} />
            <Route path="/session/new" element={<SessionEditor />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;