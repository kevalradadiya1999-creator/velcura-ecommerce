import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import CampaignPage from './pages/CampaignPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check local storage for user data
    const localUser = localStorage.getItem('clientai_user');
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
      setHasCompletedOnboarding(parsedUser.onboarding_complete || false);
    }
    setLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('clientai_user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    setHasCompletedOnboarding(false);
    localStorage.removeItem('clientai_user');
  };

  const completeOnboarding = (profileData) => {
    const updatedUser = { ...user, ...profileData, onboarding_complete: true };
    setUser(updatedUser);
    setHasCompletedOnboarding(true);
    localStorage.setItem('clientai_user', JSON.stringify(updatedUser));
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={!user ? <AuthPage loginUser={loginUser} /> : <Navigate to={hasCompletedOnboarding ? "/dashboard" : "/onboarding"} />} />
          <Route path="/onboarding" element={user && !hasCompletedOnboarding ? <OnboardingPage completeOnboarding={completeOnboarding} /> : <Navigate to={user ? "/dashboard" : "/auth"} />} />
          <Route path="/dashboard" element={user && hasCompletedOnboarding ? <DashboardPage logoutUser={logoutUser} userProfile={user} /> : <Navigate to={user ? "/onboarding" : "/auth"} />} />
          <Route path="/campaign/:campaignId" element={user && hasCompletedOnboarding ? <CampaignPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
