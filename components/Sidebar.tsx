
import React from 'react';
import { View, PlanName } from '../types';
import { AnalyticsIcon, CampaignIcon, DashboardIcon, LeadsIcon, LogoIcon, BillingIcon, SettingsIcon, InboxIcon } from './Icons';

interface SidebarProps {
  activeView: View;
  onNavClick: (view: View) => void;
  currentPlan: PlanName;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-brand-primary/10 text-brand-primary'
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-brand-surface hover:text-gray-900 dark:hover:text-gray-200'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavClick, currentPlan }) => {
  const navItems: { icon: React.ReactNode; label: View }[] = [
    { icon: <DashboardIcon className="w-5 h-5" />, label: 'Dashboard' },
    { icon: <CampaignIcon className="w-5 h-5" />, label: 'Campaigns' },
    { icon: <LeadsIcon className="w-5 h-5" />, label: 'Leads' },
    { icon: <InboxIcon className="w-5 h-5" />, label: 'Inbox' },
    { icon: <AnalyticsIcon className="w-5 h-5" />, label: 'Analytics' },
    { icon: <BillingIcon className="w-5 h-5" />, label: 'Billing' },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-brand-bg p-4 flex flex-col border-r border-gray-200 dark:border-brand-stroke/20">
      <div className="flex items-center mb-10 px-2">
        <LogoIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-xl font-bold ml-2 text-gray-900 dark:text-white">LeadForge AI</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.label}
            onClick={() => onNavClick(item.label)}
          />
        ))}
      </nav>
      {currentPlan !== 'Pro' && currentPlan !== 'Agency' && (
        <div className="mt-auto p-4 bg-gray-100 dark:bg-brand-surface rounded-lg text-center animate-fade-in">
            <p className="text-sm text-gray-500 dark:text-gray-400">Upgrade to Pro</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Unlock unlimited leads and advanced features.</p>
            <button onClick={() => onNavClick('Billing')} className="w-full mt-4 bg-gradient-to-r from-brand-secondary to-brand-primary text-black font-bold py-2 px-4 rounded-lg text-sm hover:opacity-90 transition-opacity">
                Upgrade Now
            </button>
        </div>
      )}
    </div>
  );
};