
import React, { useState } from 'react';
import { LogoIcon, GmailIcon } from '../Icons';

interface AuthViewProps {
  onLogin: () => void;
}

const AuthInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none transition-colors" />
);

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  // We are not handling real auth, so the button will just log the user in.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };
  
  // This handles the Google Sign-In button click
  const handleGoogleLogin = () => {
    // As per the prompt's instructions for Google OAuth 2.0 flow
    const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // This would be an environment variable
    // This is your backend endpoint that will handle the OAuth code from Google.
    // The backend will then exchange the code for a token and redirect the user back to the frontend dashboard.
    const GOOGLE_REDIRECT_URI = 'https://your-backend.com/auth/google/callback';

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
    });

    // Redirect the user to Google's authentication page
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };


  return (
    <div className="min-h-screen bg-white dark:bg-brand-black flex flex-col justify-center items-center p-4 font-sans animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center mb-8">
            <LogoIcon className="w-10 h-10 text-brand-primary" />
            <h1 className="text-3xl font-bold ml-3 text-gray-900 dark:text-white">LeadForge AI</h1>
        </div>
        
        <div className="bg-white dark:bg-brand-bg p-8 rounded-2xl border border-gray-200 dark:border-brand-stroke/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
              {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
              {isLoginView ? 'Sign in to continue your journey.' : 'Start generating leads in minutes.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <AuthInput type="text" placeholder="Full Name" required />
              )}
              <AuthInput type="email" placeholder="Email Address" required />
              <AuthInput type="password" placeholder="Password" required />
              
              <button type="submit" className="w-full bg-brand-primary text-black font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity text-md">
                {isLoginView ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-brand-surface" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-brand-bg text-gray-400 dark:text-gray-500">OR</span>
                </div>
            </div>

             <button
                onClick={handleGoogleLogin} // This now triggers the real OAuth flow
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-lg bg-gray-100 dark:bg-brand-surface text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-brand-stroke/20 transition-colors"
            >
                <GmailIcon className="w-5 h-5"/>
                <span>Continue with Google</span>
            </button>
            
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-brand-primary hover:underline ml-1">
                {isLoginView ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
        </div>
      </div>
    </div>
  );
};
