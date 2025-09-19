import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './views/LoginPage';
import { DashboardPage } from './views/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;