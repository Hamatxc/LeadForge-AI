
import React from 'react';
import { AnalyticsIcon, CampaignIcon, LeadsIcon } from '../Icons';

const notifications = [
    { icon: <LeadsIcon className="w-5 h-5 text-brand-primary"/>, text: <>New lead <span className="font-bold text-gray-900 dark:text-white">"Jane Doe"</span> added to "SaaS Outreach" campaign.</>, time: '5 minutes ago', bgColor: 'bg-brand-primary/10' },
    { icon: <AnalyticsIcon className="w-5 h-5 text-green-400"/>, text: <><span className="font-bold text-gray-900 dark:text-white">"John Smith"</span> replied to your email in "Fintech Q2" campaign.</>, time: '1 hour ago', bgColor: 'bg-green-500/10' },
    { icon: <CampaignIcon className="w-5 h-5 text-brand-secondary"/>, text: <>Campaign <span className="font-bold text-gray-900 dark:text-white">"Agency Growth"</span> has finished sending.</>, time: '3 hours ago', bgColor: 'bg-brand-secondary/10' },
    { icon: <LeadsIcon className="w-5 h-5 text-brand-primary"/>, text: <>New lead <span className="font-bold text-gray-900 dark:text-white">"Alex Ray"</span> added to "Fintech Prospecting" campaign.</>, time: '1 day ago', bgColor: 'bg-brand-primary/10' },
    { icon: <CampaignIcon className="w-5 h-5 text-brand-secondary"/>, text: <>Campaign <span className="font-bold text-gray-900 dark:text-white">"SaaS Outreach Q3"</span> is now active.</>, time: '2 days ago', bgColor: 'bg-brand-secondary/10' },
    { icon: <AnalyticsIcon className="w-5 h-5 text-green-400"/>, text: <>Your monthly analytics report is ready.</>, time: '3 days ago', bgColor: 'bg-green-500/10' },
    { icon: <LeadsIcon className="w-5 h-5 text-brand-primary"/>, text: <>15 new leads generated for <span className="font-bold text-gray-900 dark:text-white">"Agency Growth"</span>.</>, time: '3 days ago', bgColor: 'bg-brand-primary/10' },
];

export const NotificationsView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Notifications</h1>
            <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/20">
                <ul className="divide-y divide-gray-100 dark:divide-brand-surface">
                    {notifications.map((notification, index) => (
                        <li key={index} className="flex items-start space-x-4 p-4">
                            <div className={`p-2 ${notification.bgColor} rounded-full mt-1 shrink-0`}>{notification.icon}</div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 dark:text-gray-300">{notification.text}</p>
                                <span className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
