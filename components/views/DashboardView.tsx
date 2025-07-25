
import React from 'react';
import { AnalyticsIcon, CampaignIcon, LeadsIcon } from '../Icons';
import { View, UserSettings, Campaign, CampaignStatus } from '../../types';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    change: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change }) => (
    <div className="bg-white dark:bg-brand-bg p-6 rounded-xl border border-gray-200 dark:border-brand-stroke/20">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            {icon}
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        <p className="text-sm text-green-400 mt-1">{change}</p>
    </div>
);

interface DashboardViewProps {
  setActiveView: (view: View) => void;
  userSettings: UserSettings;
  campaigns: Campaign[];
}

const getWelcomeMessage = (language: UserSettings['ui']['language'], name: string): string => {
    const firstName = name.split(' ')[0];
    const messages: Partial<Record<UserSettings['ui']['language'], string>> = {
        'English': `Welcome back, ${firstName}!`,
        'Spanish': `¡Bienvenido de nuevo, ${firstName}!`,
        'French': `Bienvenue, ${firstName} !`,
        'German': `Willkommen zurück, ${firstName}!`,
        'Mandarin Chinese': `欢迎回来, ${firstName}!`,
        'Hindi': `वापसी पर स्वागत है, ${firstName}!`,
        'Arabic': `أهلاً بعودتك يا ${firstName}!`,
        'Portuguese': `Bem-vindo de volta, ${firstName}!`,
        'Bengali': `फিরে আসার জন্য স্বাগতম, ${firstName}!`,
        'Russian': `С возвращением, ${firstName}!`,
        'Japanese': `おかえりなさい、${firstName}さん！`,
        'Italian': `Bentornato, ${firstName}!`,
        'Korean': `다시 오신 것을 환영합니다, ${firstName}님!`,
        'Dutch': `Welkom terug, ${firstName}!`,
        'Swedish': `Välkommen tillbaka, ${firstName}!`,
        'Turkish': `Tekrar hoş geldin, ${firstName}!`,
        'Polish': `Witaj z powrotem, ${firstName}!`,
        'Indonesian': `Selamat datang kembali, ${firstName}!`,
        'Thai': `ยินดีต้อนรับกลับ, ${firstName}!`,
        'Vietnamese': `Chào mừng trở lại, ${firstName}!`,
        'Hebrew': `!${firstName} ,ברוך שובך`,
        'Danish': `Velkommen tilbage, ${firstName}!`,
        'Finnish': `Tervetuloa takaisin, ${firstName}!`,
        'Norwegian': `Velkommen tilbake, ${firstName}!`,
        'Czech': `Vítejte zpět, ${firstName}!`,
        'Hungarian': `Üdvözöljük újra, ${firstName}!`,
        'Romanian': `Bun venit înapoi, ${firstName}!`,
        'Ukrainian': `З поверненням, ${firstName}!`,
        'Greek': `Καλώς όρισες πίσω, ${firstName}!`,
    };
    return messages[language] || messages['English']!;
}

export const DashboardView: React.FC<DashboardViewProps> = ({setActiveView, userSettings, campaigns}) => {
    const activeCampaigns = campaigns.filter(c => 
        c.status === CampaignStatus.Active || 
        c.status === CampaignStatus.Sending
    ).length;
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{getWelcomeMessage(userSettings.ui.language, userSettings.profile.name)}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your performance snapshot for this month.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<CampaignIcon className="w-6 h-6 text-brand-secondary" />} title="Active Campaigns" value={String(activeCampaigns)} change="+1 this month" />
                <StatCard icon={<LeadsIcon className="w-6 h-6 text-brand-primary" />} title="New Leads" value="1,204" change="+15% vs last month" />
                <StatCard icon={<AnalyticsIcon className="w-6 h-6 text-green-400" />} title="Overall Reply Rate" value="8.2%" change="+0.5% vs last month" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-brand-bg p-6 rounded-xl border border-gray-200 dark:border-brand-stroke/20">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                    <ul className="mt-4 space-y-4">
                        <li className="flex items-center space-x-3">
                            <div className="p-2 bg-brand-primary/10 rounded-full"><LeadsIcon className="w-5 h-5 text-brand-primary"/></div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">New lead <span className="font-bold text-gray-900 dark:text-white">"Jane Doe"</span> added to "SaaS Outreach" campaign.</p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">5m ago</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="p-2 bg-green-500/10 rounded-full"><AnalyticsIcon className="w-5 h-5 text-green-400"/></div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">"John Smith" replied to your email in "Fintech Q2" campaign.</p>
                             <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">1h ago</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="p-2 bg-brand-secondary/10 rounded-full"><CampaignIcon className="w-5 h-5 text-brand-secondary"/></div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Campaign "Agency Growth" has finished sending.</p>
                             <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">3h ago</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-brand-bg p-6 rounded-xl border border-gray-200 dark:border-brand-stroke/20 flex flex-col justify-center items-center text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ready to find more leads?</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">Launch a new campaign to leverage our AI and discover thousands of verified B2B leads automatically.</p>
                    <button onClick={() => setActiveView('Campaigns')} className="mt-6 bg-gradient-to-r from-brand-secondary to-brand-primary text-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                        Create New Campaign
                    </button>
                </div>
            </div>
        </div>
    );
};
