import React from 'react';
import { GmailIcon, LogoIcon } from './Icons';

interface GmailAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
}

export const GmailAuthModal: React.FC<GmailAuthModalProps> = ({ isOpen, onClose, onAllow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-brand-surface rounded-lg w-full max-w-md p-6 m-4 font-sans">
        {/* Header */}
        <div className="flex items-center space-x-3">
            <LogoIcon className="w-8 h-8 text-brand-primary" />
            <h1 className="text-xl font-bold text-gray-700 dark:text-gray-200">LeadForge AI</h1>
        </div>

        <div className="text-center my-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Choose an account</h2>
            <p className="text-gray-500 dark:text-gray-400">to continue to LeadForge AI</p>
        </div>

        {/* Simulated Account */}
        <button className="w-full border border-gray-300 dark:border-brand-stroke/50 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-brand-stroke/20 transition-colors">
            <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://picsum.photos/100/100"
                alt="User avatar"
            />
            <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Alex Starr</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">alex.starr@gmail.com</p>
            </div>
        </button>

        <div className="my-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                To continue, Google will share your name, email address, language preference, and profile picture with LeadForge AI. Before using this app, you can review LeadForge AI's privacy policy and terms of service.
            </p>
        </div>

        <div className="border-t border-gray-200 dark:border-brand-stroke/30 pt-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">LeadForge AI wants access to your Google Account</h3>
            <div className="flex items-start space-x-3 bg-gray-100 dark:bg-brand-bg p-4 rounded-lg">
                <GmailIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 mt-0.5 shrink-0" />
                <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Send email on your behalf</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Allows LeadForge AI to send emails from your connected account to leads in your campaigns.</p>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center mt-8">
            <button onClick={onClose} className="text-sm font-semibold text-blue-600 dark:text-brand-primary hover:bg-blue-50 dark:hover:bg-brand-primary/10 px-4 py-2 rounded">
                Cancel
            </button>
            <button onClick={onAllow} className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                Allow
            </button>
        </div>
      </div>
    </div>
  );
};