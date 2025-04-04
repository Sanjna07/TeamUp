import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CompleteProfile from './pages/CompleteProfile';
import ChatRoom from './pages/ChatRoom';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AppContent = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      {isSignedIn && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat/:roomId" element={<ChatRoom />} />
          <Route path="/settings" element={<Navigate to="/edit-profile" />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Router>
        <Toaster position="top-right" />
        <AppContent />
      </Router>
    </ClerkProvider>
  );
}

export default App;