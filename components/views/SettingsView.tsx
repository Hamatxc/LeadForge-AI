
import React, { useState, useRef, useEffect } from 'react';
import { Integration, UserSettings, AITone, AIEmailLength, AIFollowUpStyle, Language } from '../../types';
import { GmailIcon, LockClosedIcon, UserCircleIcon, DocumentDownloadIcon, SettingsIcon, CampaignIcon, CameraIcon } from '../Icons';
import { GmailAuthModal } from '../GmailAuthModal';

// Reusable Components for Settings Page
const SettingsSection: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white dark:bg-brand-bg p-8 rounded-xl border border-gray-200 dark:border-brand-stroke/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">{description}</p>
        <div className="space-y-6">{children}</div>
    </div>
);

const SettingRow: React.FC<{ label: string; description?: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div className="flex flex-col md:flex-row justify-between md:items-start border-t border-gray-100 dark:border-brand-surface pt-6 first:border-t-0 first:pt-0">
        <div>
            <label className="font-semibold text-gray-900 dark:text-white">{label}</label>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">{description}</p>}
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-1/2 lg:w-2/5 shrink-0">{children}</div>
    </div>
);


const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button onClick={() => onChange(!enabled)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-brand-primary' : 'bg-gray-200 dark:bg-brand-surface'}`}>
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const StyledInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
);

const StyledSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select {...props} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none appearance-none" />
);

const StyledTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
     <textarea {...props} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white min-h-[100px] border-2 border-transparent focus:border-brand-primary focus:outline-none" />
);

const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
    <button {...props} className={`bg-brand-primary text-black font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`} />
);

const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
    <button {...props} className={`bg-gray-200 dark:bg-brand-surface text-gray-900 dark:text-white font-bold py-2 px-4 rounded-lg hover:opacity-80 transition-opacity text-sm ${props.className}`} />
);


interface SettingsViewProps {
  integration: Integration | null;
  onIntegrationChange: (integration: Integration | null) => void;
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

const languages: Language[] = ['English', 'Spanish', 'French', 'German', 'Mandarin Chinese', 'Hindi', 'Arabic', 'Portuguese', 'Bengali', 'Russian', 'Japanese', 'Italian', 'Korean', 'Dutch', 'Swedish', 'Turkish', 'Polish', 'Indonesian', 'Thai', 'Vietnamese', 'Hebrew', 'Danish', 'Finnish', 'Norwegian', 'Czech', 'Hungarian', 'Romanian', 'Ukrainian', 'Greek'];

export const SettingsView: React.FC<SettingsViewProps> = ({ integration, onIntegrationChange, settings, onSettingsChange }) => {
    const [activeTab, setActiveTab] = useState('Profile & UI');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
    const [isSaving, setIsSaving] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const hasChanges = JSON.stringify(localSettings) !== JSON.stringify(settings);
    
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleLocalSettingChange = <T extends keyof UserSettings>(category: T, key: keyof UserSettings[T], value: any) => {
        setLocalSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value,
            },
        }));
    };
    
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    handleLocalSettingChange('profile', 'avatar', event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => { // Simulate API call
            onSettingsChange(localSettings);
            setIsSaving(false);
        }, 1000);
    };

    const handleDiscard = () => {
        setLocalSettings(settings);
    };
    
    const TabButton: React.FC<{ label: string, icon: React.ReactNode }> = ({ label, icon }) => (
        <button
            onClick={() => setActiveTab(label)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === label ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-brand-surface'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
    
    const handleConnectGmail = () => setIsAuthModalOpen(true);
    const handleDisconnectGmail = () => onIntegrationChange(null);
    const handleAuthSuccess = () => {
        onIntegrationChange({ provider: 'Gmail', account: 'alex.starr@gmail.com' });
        setIsAuthModalOpen(false);
    };

    return (
        <>
            <GmailAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onAllow={handleAuthSuccess} />
            <div className="space-y-8 pb-24">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account and application preferences.</p>
                </div>

                <div className="flex space-x-2 border-b border-gray-200 dark:border-brand-stroke/20 pb-2">
                    <TabButton label="Profile & UI" icon={<UserCircleIcon className="w-5 h-5"/>} />
                    <TabButton label="AI & Automation" icon={<SettingsIcon className="w-5 h-5"/>} />
                    <TabButton label="Campaign Defaults" icon={<CampaignIcon className="w-5 h-5"/>} />
                    <TabButton label="Security" icon={<LockClosedIcon className="w-5 h-5"/>} />
                </div>
                
                <div className="animate-fade-in">
                    {activeTab === 'Profile & UI' && (
                        <div className="space-y-6">
                            <SettingsSection title="Profile" description="This information will be displayed on your profile.">
                                <SettingRow label="Profile Picture">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative group">
                                            <img src={localSettings.profile.avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover"/>
                                            <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                                            <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <CameraIcon className="w-6 h-6 text-white"/>
                                            </button>
                                        </div>
                                        <SecondaryButton onClick={() => avatarInputRef.current?.click()}>Change Picture</SecondaryButton>
                                    </div>
                                </SettingRow>
                                <SettingRow label="Full Name">
                                    <StyledInput value={localSettings.profile.name} onChange={(e) => handleLocalSettingChange('profile', 'name', e.target.value)} />
                                </SettingRow>
                                <SettingRow label="Email Address">
                                    <StyledInput type="email" value={localSettings.profile.email} onChange={(e) => handleLocalSettingChange('profile', 'email', e.target.value)} />
                                </SettingRow>
                            </SettingsSection>
                            <SettingsSection title="UI Preferences" description="Customize the look and feel of the application.">
                                <SettingRow label="Dark Mode">
                                    <ToggleSwitch enabled={localSettings.ui.darkMode} onChange={(e) => handleLocalSettingChange('ui', 'darkMode', e)} />
                                </SettingRow>
                                <SettingRow label="Language">
                                    <StyledSelect value={localSettings.ui.language} onChange={(e) => handleLocalSettingChange('ui', 'language', e.target.value as UserSettings['ui']['language'])}>
                                        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                                    </StyledSelect>
                                </SettingRow>
                            </SettingsSection>
                        </div>
                    )}
                    
                    {activeTab === 'AI & Automation' && (
                        <div className="space-y-6">
                            <SettingsSection title="AI Settings" description="Control how the AI generates content for your campaigns.">
                                <SettingRow label="Tone of Voice">
                                    <StyledSelect value={localSettings.ai.tone} onChange={e => handleLocalSettingChange('ai', 'tone', e.target.value as AITone)}>
                                        <option>Professional</option>
                                        <option>Friendly</option>
                                        <option>Persuasive</option>
                                        <option>Casual</option>
                                    </StyledSelect>
                                </SettingRow>
                                <SettingRow label="Email Length">
                                     <StyledSelect value={localSettings.ai.emailLength} onChange={e => handleLocalSettingChange('ai', 'emailLength', e.target.value as AIEmailLength)}>
                                        <option>Short & Punchy</option>
                                        <option>Medium</option>
                                        <option>Detailed</option>
                                    </StyledSelect>
                                </SettingRow>
                                <SettingRow label="Default Follow-up Style" description="The default style used by the AI Follow-up Engine.">
                                     <StyledSelect value={localSettings.ai.followUpStyle} onChange={e => handleLocalSettingChange('ai', 'followUpStyle', e.target.value as AIFollowUpStyle)}>
                                        <option>Gentle Reminder</option>
                                        <option>Value Add</option>
                                        <option>Direct Question</option>
                                    </StyledSelect>
                                </SettingRow>
                            </SettingsSection>
                             <SettingsSection title="Email Automation" description="Manage sending behavior and integrations.">
                                <SettingRow label="Gmail Integration">
                                    {integration ? (
                                        <div className="flex items-center justify-between bg-gray-100 dark:bg-brand-surface p-3 rounded-lg w-full">
                                            <div className="flex items-center space-x-2">
                                                <GmailIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                                                <span className="text-sm text-gray-900 dark:text-white font-medium">{integration.account}</span>
                                            </div>
                                            <button onClick={handleDisconnectGmail} className="text-xs font-bold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300">Disconnect</button>
                                        </div>
                                    ) : (
                                        <PrimaryButton onClick={handleConnectGmail} className="w-full">Connect Gmail</PrimaryButton>
                                    )}
                                </SettingRow>
                                <SettingRow label="Custom Signature" description="This will be appended to all outgoing emails.">
                                    <StyledTextarea value={localSettings.email.signature} onChange={e => handleLocalSettingChange('email', 'signature', e.target.value)} />
                                </SettingRow>
                                 <SettingRow label="Daily Send Limit" description={`Max emails per day: ${localSettings.email.dailySendLimit}`}>
                                      <input type="range" min="20" max="500" step="10" value={localSettings.email.dailySendLimit} onChange={e => handleLocalSettingChange('email', 'dailySendLimit', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-brand-surface rounded-lg appearance-none cursor-pointer" />
                                </SettingRow>
                                 <SettingRow label="Number of Follow-ups" description="Maximum number of follow-up emails to send if no reply is received (0-3).">
                                    <div className="flex flex-col items-end">
                                        <input type="range" min="0" max="3" step="1" value={localSettings.followUp.count} onChange={e => handleLocalSettingChange('followUp', 'count', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-brand-surface rounded-lg appearance-none cursor-pointer" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300 mt-2">{localSettings.followUp.count} follow-ups</span>
                                    </div>
                                </SettingRow>
                                <SettingRow label="Delay between Follow-ups (days)" description="Number of days to wait before sending a follow-up email.">
                                    <StyledInput type="number" min="1" max="30" value={localSettings.followUp.delayDays} onChange={e => handleLocalSettingChange('followUp', 'delayDays', parseInt(e.target.value))} />
                                </SettingRow>
                            </SettingsSection>
                        </div>
                    )}

                    {activeTab === 'Campaign Defaults' && (
                         <SettingsSection title="New Campaign Defaults" description="Save time by setting default values for new campaigns.">
                            <SettingRow label="Default Niche">
                                <StyledInput value={localSettings.campaignDefaults.niche} onChange={e => handleLocalSettingChange('campaignDefaults', 'niche', e.target.value)} />
                            </SettingRow>
                            <SettingRow label="Default Location">
                                <StyledInput value={localSettings.campaignDefaults.location} onChange={e => handleLocalSettingChange('campaignDefaults', 'location', e.target.value)} />
                            </SettingRow>
                            <SettingRow label="Default Offer Template">
                                <StyledTextarea value={localSettings.campaignDefaults.offerTemplate} onChange={e => handleLocalSettingChange('campaignDefaults', 'offerTemplate', e.target.value)} />
                            </SettingRow>
                            <SettingRow label="Default CTA Template">
                                <StyledTextarea value={localSettings.campaignDefaults.ctaTemplate} onChange={e => handleLocalSettingChange('campaignDefaults', 'ctaTemplate', e.target.value)} />
                            </SettingRow>
                         </SettingsSection>
                    )}

                    {activeTab === 'Security' && (
                         <SettingsSection title="Security & Data" description="Manage your account security and export your data.">
                            <SettingRow label="Change Password">
                                <SecondaryButton onClick={() => alert('Password change screen not implemented.')}>Set New Password</SecondaryButton>
                            </SettingRow>
                            <SettingRow label="Two-Factor Authentication (2FA)" description="Add an extra layer of security to your account.">
                                <ToggleSwitch enabled={localSettings.security.twoFactorEnabled} onChange={e => handleLocalSettingChange('security', 'twoFactorEnabled', e)} />
                            </SettingRow>
                            <SettingRow label="API Key" description="For use with custom integrations.">
                               <div className="flex items-center space-x-2 w-full">
                                     <StyledInput type="password" readOnly value={localSettings.security.apiKey} />
                                     <SecondaryButton onClick={() => navigator.clipboard.writeText(localSettings.security.apiKey)}>Copy</SecondaryButton>
                               </div>
                            </SettingRow>
                            <SettingRow label="Export Data" description="Export all your campaigns and leads data.">
                                <PrimaryButton onClick={() => alert('Data export initiated.')} className="flex items-center space-x-2">
                                    <DocumentDownloadIcon className="w-5 h-5"/>
                                    <span>Export as CSV</span>
                                </PrimaryButton>
                            </SettingRow>
                         </SettingsSection>
                    )}
                </div>
            </div>
            
            {hasChanges && (
                <div className="fixed bottom-0 left-64 right-0 w-auto z-40">
                    <div className="bg-white dark:bg-brand-surface p-4 border-t border-gray-200 dark:border-brand-stroke/20 shadow-lg flex justify-center items-center">
                        <div className="flex items-center space-x-6">
                            <p className="text-gray-900 dark:text-white font-semibold">You have unsaved changes!</p>
                            <SecondaryButton onClick={handleDiscard}>Discard</SecondaryButton>
                            <PrimaryButton onClick={handleSave} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
