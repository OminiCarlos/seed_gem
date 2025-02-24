import './index.css';
import { useState, useEffect } from 'react';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import PlantEventLogs from "./PlantEventLogs";


// console.log(supabase);

function AuthPage() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate('/home'); // Redirect to HomePage after login
      }
    });

    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <div>Redirecting...</div>; // Briefly show before redirect
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} /> {/* Login page */}
        <Route path="/home" element={<HomePage />} /> {/* Home page after login */}
        <Route path="/PlantEventLogs" element={<PlantEventLogs />} /> {/* Home page after login */}
      </Routes>
    </Router>
  );
}
