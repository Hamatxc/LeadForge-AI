
import React, { useState, useCallback, useEffect } from 'react';
import { Campaign, Lead, UserSettings, LeadStatus, AITone, AIFollowUpStyle } from '../types';
import { generateColdEmail, generateFollowUpEmail } from '../services/geminiService';
import { SpinnerIcon } from './Icons';

interface EmailGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  lead: Lead | null;
  userSettings: UserSettings;
  onEmailSent: (updatedLead: Lead) => void;
}

export const EmailGeneratorModal: React.FC<EmailGeneratorModalProps> = ({ isOpen, onClose, campaign, lead, userSettings, onEmailSent }) => {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const isFollowUp = lead ? lead.status !== LeadStatus.New : false;
  const [style, setStyle] = useState<AITone | AIFollowUpStyle>('Persuasive');

  // Reset state when modal opens or lead changes
  useEffect(() => {
    if (isOpen && lead) {
        const followUpMode = lead.status !== LeadStatus.New;
        setStyle(followUpMode ? userSettings.ai.followUpStyle : userSettings.ai.tone);
        setGeneratedEmail('');
    }
  }, [isOpen, lead, userSettings]);
  
  const handleGenerateEmail = useCallback(async () => {
    if (!lead) return;
    setIsLoading(true);
    setGeneratedEmail('');
    try {
      let emailTemplate: string;
      if (isFollowUp) {
        emailTemplate = await generateFollowUpEmail(campaign.niche, campaign.problem, campaign.offer, style as AIFollowUpStyle);
      } else {
        emailTemplate = await generateColdEmail(campaign.niche, campaign.location, campaign.problem, campaign.offer, style as AITone);
      }
      
      const firstName = lead.name.split(' ')[0];
      const personalizedEmail = emailTemplate
        .replace(/\[First Name\]/gi, firstName)
        .replace(/\[Company Name\]/gi, lead.company);
      setGeneratedEmail(personalizedEmail);
    } catch (error) {
      console.error(error);
      setGeneratedEmail('Failed to generate email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [campaign, lead, style, isFollowUp]);

  const handleSendEmail = () => {
    if (!lead) return;
    const updatedLead: Lead = {
      ...lead,
      status: LeadStatus.Contacted,
      lastContacted: new Date().toISOString().split('T')[0],
      followUpCount: isFollowUp ? lead.followUpCount + 1 : lead.followUpCount,
    }
    onEmailSent(updatedLead);
  };

  if (!isOpen || !lead) return null;

  const styleOptions = isFollowUp 
    ? ['Gentle Reminder', 'Value Add', 'Direct Question']
    : ['Professional', 'Friendly', 'Persuasive', 'Casual'];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/30 w-full max-w-2xl p-8 m-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isFollowUp ? 'AI Follow-up Generator' : 'AI Cold Email Generator'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
            Generating a {isFollowUp && 'follow-up'} email for <span className="text-gray-800 dark:text-white font-semibold">{lead.name}</span> at <span className="text-gray-800 dark:text-white font-semibold">{lead.company}</span>.
        </p>

        <div className="space-y-4">
            <div>
                <label htmlFor="style-select" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {isFollowUp ? 'Follow-up Style' : 'Tone'}
                </label>
                <select id="style-select" value={style} onChange={e => setStyle(e.target.value as AITone | AIFollowUpStyle)} className="mt-1 w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none">
                    {styleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
        </div>

        <button onClick={handleGenerateEmail} disabled={isLoading} className="mt-6 w-full bg-gradient-to-r from-brand-secondary to-brand-primary text-black font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center">
          {isLoading && <SpinnerIcon className="animate-spin h-5 w-5 mr-3" />}
          {isLoading ? 'Generating...' : `✨ Generate ${isFollowUp ? 'Follow-up' : 'AI Email'}`}
        </button>

        {generatedEmail && (
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Generated Personalized Email:</h3>
                <textarea readOnly value={generatedEmail} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-700 dark:text-gray-300 min-h-[250px] border border-gray-200 dark:border-brand-stroke/20 focus:outline-none"></textarea>
            </div>
        )}

        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="py-2 px-6 bg-gray-200 dark:bg-brand-surface rounded-lg text-gray-900 dark:text-white hover:opacity-80">Close</button>
          {generatedEmail && (
            <button onClick={handleSendEmail} className="py-2 px-6 bg-brand-primary rounded-lg text-black font-bold hover:opacity-90">Send Email</button>
          )}
        </div>
      </div>
    </div>
  );
};