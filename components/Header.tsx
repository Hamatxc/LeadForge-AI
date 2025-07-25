
import React, { useState, useEffect, useRef } from 'react';
import { AnalyticsIcon, CampaignIcon, LeadsIcon, LogoutIcon, SettingsIcon } from './Icons';
import { View, UserSettings } from '../types';

interface HeaderProps {
  title: string;
  onNavClick: (view: View) => void;
  userSettings: UserSettings;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onNavClick, userSettings, onLogout }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewAllClick = () => {
    onNavClick('Notifications');
    setIsNotificationsOpen(false);
  };
  
  const handleProfileMenuClick = (view: View) => {
    onNavClick(view);
    setIsProfileOpen(false);
  }

  return (
    <header className="flex items-center justify-between p-6 bg-white dark:bg-brand-bg border-b border-gray-200 dark:border-brand-stroke/20">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <div className="flex items-center space-x-4">
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setIsNotificationsOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-surface transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
          </button>
          {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-3 w-80 md:w-96 bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/30 shadow-2xl z-50 overflow-hidden animate-fade-in-down">
                  <div className="p-4 border-b border-gray-100 dark:border-brand-surface">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Notifications</h4>
                  </div>
                  <ul className="py-1 max-h-96 overflow-y-auto">
                        <li className="flex items-start space-x-3 p-4 hover:bg-gray-100 dark:hover:bg-brand-surface/50 transition-colors cursor-pointer">
                          <div className="p-2 bg-brand-primary/10 rounded-full mt-1"><LeadsIcon className="w-5 h-5 text-brand-primary"/></div>
                          <div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">New lead <span className="font-bold text-gray-900 dark:text-white">"Jane Doe"</span> added to "SaaS Outreach" campaign.</p>
                              <span className="text-xs text-gray-400 dark:text-gray-500">5 minutes ago</span>
                          </div>
                      </li>
                      <li className="flex items-start space-x-3 p-4 hover:bg-gray-100 dark:hover:bg-brand-surface/50 transition-colors cursor-pointer">
                          <div className="p-2 bg-green-500/10 rounded-full mt-1"><AnalyticsIcon className="w-5 h-5 text-green-400"/></div>
                          <div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">"John Smith" replied to your email in "Fintech Q2" campaign.</p>
                              <span className="text-xs text-gray-400 dark:text-gray-500">1 hour ago</span>
                          </div>
                      </li>
                      <li className="flex items-start space-x-3 p-4 hover:bg-gray-100 dark:hover:bg-brand-surface/50 transition-colors cursor-pointer">
                          <div className="p-2 bg-brand-secondary/10 rounded-full mt-1"><CampaignIcon className="w-5 h-5 text-brand-secondary"/></div>
                          <div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Campaign "Agency Growth" has finished sending.</p>
                              <span className="text-xs text-gray-400 dark:text-gray-500">3 hours ago</span>
                          </div>
                      </li>
                  </ul>
                  <div className="p-2 border-t border-gray-100 dark:border-brand-surface text-center">
                      <button onClick={handleViewAllClick} className="text-sm font-medium text-brand-primary hover:underline">View all notifications</button>
                  </div>
              </div>
          )}
        </div>
        <div className="relative" ref={profileRef}>
          <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-brand-surface transition-colors">
            <img
              className="h-9 w-9 rounded-full object-cover"
              src={userSettings.profile.avatar}
              alt="User avatar"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white text-left">{userSettings.profile.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-left">{userSettings.ai.tone} Plan</p>
            </div>
          </button>
          {isProfileOpen && (
               <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/30 shadow-2xl z-50 overflow-hidden animate-fade-in-down p-2">
                   <button onClick={() => handleProfileMenuClick('Settings')} className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brand-surface hover:text-gray-900 dark:hover:text-white rounded-md transition-colors">
                        <SettingsIcon className="w-5 h-5" />
                        <span>Settings</span>
                   </button>
                   <button onClick={onLogout} className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-brand-surface hover:text-red-600 dark:hover:text-red-300 rounded-md transition-colors">
                        <LogoutIcon className="w-5 h-5" />
                        <span>Sign Out</span>
                   </button>
               </div>
          )}
        </div>
      </div>
    </header>
  );
};
