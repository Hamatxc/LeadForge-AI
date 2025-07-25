
import React, { useState, useEffect } from 'react';
import { Campaign, CampaignSchedule, CampaignStatus } from '../types';
import { SpinnerIcon } from './Icons';

interface ScheduleCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  onSchedule: (campaign: Campaign) => void;
}

export const ScheduleCampaignModal: React.FC<ScheduleCampaignModalProps> = ({ isOpen, onClose, campaign, onSchedule }) => {
  const [schedule, setSchedule] = useState<CampaignSchedule>({
    startDate: new Date().toISOString().split('T')[0],
    timeWindow: { start: '09:00', end: '17:00' },
    emailsPerDay: 50,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (campaign?.schedule) {
      setSchedule(campaign.schedule);
    } else {
        // Reset to default when opening for a new campaign
        setSchedule({
            startDate: new Date().toISOString().split('T')[0],
            timeWindow: { start: '09:00', end: '17:00' },
            emailsPerDay: 50,
        })
    }
  }, [campaign, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'timeStart') {
        setSchedule(prev => ({...prev, timeWindow: {...prev.timeWindow, start: value}}));
    } else if (name === 'timeEnd') {
        setSchedule(prev => ({...prev, timeWindow: {...prev.timeWindow, end: value}}));
    } else {
        setSchedule(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveSchedule = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
        onSchedule({
            ...campaign,
            schedule: schedule,
            status: CampaignStatus.Sending, // Start sending immediately for simulation
        });
        setIsSaving(false);
        onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/30 w-full max-w-lg p-8 m-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Auto-Sender Schedule</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Configure the sending schedule for "{campaign.name}".</p>

        <div className="space-y-6">
            <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Start Date</label>
                <input type="date" name="startDate" value={schedule.startDate} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Daily Sending Window</label>
                <div className="flex items-center space-x-4">
                    <input type="time" name="timeStart" value={schedule.timeWindow.start} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
                    <span className="text-gray-500 dark:text-gray-400">to</span>
                    <input type="time" name="timeEnd" value={schedule.timeWindow.end} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
                </div>
            </div>
            <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Emails Per Day (Throttling)</label>
                 <input type="range" name="emailsPerDay" min="10" max="200" step="5" value={schedule.emailsPerDay} onChange={handleInputChange} className="w-full h-2 bg-gray-200 dark:bg-brand-surface rounded-lg appearance-none cursor-pointer" />
                 <div className="text-center text-gray-900 dark:text-white mt-2 font-semibold">{schedule.emailsPerDay} emails/day</div>
            </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="py-2 px-6 bg-gray-200 dark:bg-brand-surface rounded-lg text-gray-900 dark:text-white hover:opacity-80">
            Cancel
          </button>
          <button onClick={handleSaveSchedule} disabled={isSaving} className="py-2 px-6 bg-brand-primary rounded-lg text-black font-bold hover:opacity-90 flex items-center justify-center min-w-[150px]">
             {isSaving ? <SpinnerIcon className="animate-spin h-5 w-5"/> : 'Save & Start Sending'}
          </button>
        </div>
      </div>
    </div>
  );
};
