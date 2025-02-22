import './index.css';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import PlantEventLogs from "./PlantEventLogs";

const supabase = createClient('https://hcwkiyqibkgkluouhkib.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjd2tpeXFpYmtna2x1b3Voa2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNDExODYsImV4cCI6MjA0MjgxNzE4Nn0.DZXk4MZ-x6myPy5XW0N6FRu06T6z53r1asvXlpdRLio');

console.log(supabase);

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
