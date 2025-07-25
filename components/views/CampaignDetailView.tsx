
import React, { useState } from 'react';
import { Campaign, Lead, LeadStatus, Integration, CampaignStatus, UserSettings } from '../../types';
import { LeadsIcon, CampaignIcon, AnalyticsIcon } from '../Icons';
import { EmailGeneratorModal } from '../EmailGeneratorModal';
import { ScheduleCampaignModal } from '../ScheduleCampaignModal';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-stroke/20">
        <div className="flex items-center">
            {icon}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-3">{title}</p>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </div>
);

interface CampaignDetailViewProps {
  campaign: Campaign;
  leads: Lead[];
  onBack: () => void;
  integration: Integration | null;
  onUpdateCampaign: (campaign: Campaign) => void;
  userSettings: UserSettings;
}

export const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({ campaign, leads, onBack, integration, onUpdateCampaign, userSettings }) => {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const handleOpenEmailModal = (lead: Lead) => {
        setSelectedLead(lead);
        setIsEmailModalOpen(true);
    };

    const handleCloseEmailModal = () => {
        setIsEmailModalOpen(false);
        setSelectedLead(null);
    };

    const handleEmailSent = (updatedLead: Lead) => {
        // State is managed globally now, so we don't need to update local state.
        // The parent component will handle the update.
        handleCloseEmailModal();
    };
    
    const handlePauseCampaign = () => {
        onUpdateCampaign({ ...campaign, status: CampaignStatus.Paused });
    };

    const handleResumeCampaign = () => {
        onUpdateCampaign({ ...campaign, status: CampaignStatus.Sending });
    };

    const getStatusColor = (status: LeadStatus) => {
        switch (status) {
          case LeadStatus.Interested: return 'bg-green-500/20 text-green-400';
          case LeadStatus.Replied: return 'bg-cyan-500/20 text-cyan-400';
          case LeadStatus.Contacted: return 'bg-blue-500/20 text-blue-400';
          case LeadStatus.NotInterested: return 'bg-red-500/20 text-red-400';
          case LeadStatus.New: return 'bg-gray-500/20 text-gray-400';
          default: return 'bg-gray-700 text-gray-300';
        }
      };

    const progress = campaign.leadsCount > 0 ? (campaign.sentCount / campaign.leadsCount) * 100 : 0;
    
    const renderActionButtons = () => {
        switch (campaign.status) {
            case CampaignStatus.Sending:
                return <button onClick={handlePauseCampaign} className="bg-orange-500/20 text-orange-400 font-bold py-2 px-5 rounded-lg hover:bg-orange-500/30 transition-colors">Pause Sending</button>;
            case CampaignStatus.Paused:
                return <button onClick={handleResumeCampaign} className="bg-cyan-500/20 text-cyan-400 font-bold py-2 px-5 rounded-lg hover:bg-cyan-500/30 transition-colors">Resume Sending</button>;
            case CampaignStatus.Active:
            case CampaignStatus.Scheduled:
                 return (
                    <div className="relative group">
                         <button 
                            onClick={() => setIsScheduleModalOpen(true)}
                            disabled={!integration}
                            className="bg-gradient-to-r from-brand-secondary to-brand-primary text-black font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {campaign.status === 'Scheduled' ? 'Update Schedule' : 'Start Auto-Sending'}
                        </button>
                        {!integration && <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-brand-surface rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Connect an email provider in Settings to enable.</div>}
                    </div>
                );
            default:
                return null;
        }
    }


    return (
    <>
      <EmailGeneratorModal 
        isOpen={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        campaign={campaign}
        lead={selectedLead}
        userSettings={userSettings}
        onEmailSent={handleEmailSent}
      />
      <ScheduleCampaignModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        campaign={campaign}
        onSchedule={onUpdateCampaign}
      />
      <div className="space-y-8">
        <div className="flex justify-between items-start">
            <div>
              <button onClick={onBack} className="text-sm font-medium text-brand-primary hover:underline mb-4 flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  <span>Back to Campaigns</span>
              </button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{campaign.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Targeting {campaign.niche} in {campaign.location} solving for {campaign.problem}.</p>
            </div>
            <div className="mt-8">
                {renderActionButtons()}
            </div>
        </div>

        {campaign.status === CampaignStatus.Sending && (
             <div className="bg-gray-100 dark:bg-brand-surface p-4 rounded-lg">
                <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-medium text-cyan-500 dark:text-cyan-400">Sending Progress</span>
                    <span className="text-gray-600 dark:text-gray-300">{campaign.sentCount.toLocaleString()} / {campaign.leadsCount.toLocaleString()} emails</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-brand-black rounded-full h-2.5">
                    <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<LeadsIcon className="w-6 h-6 text-brand-primary" />} title="Total Leads" value={campaign.leadsCount.toLocaleString()} />
          <StatCard icon={<CampaignIcon className="w-6 h-6 text-brand-secondary" />} title="Emails Sent" value={campaign.sentCount.toLocaleString()} />
          <StatCard icon={<AnalyticsIcon className="w-6 h-6 text-green-400" />} title="Reply Rate" value={`${campaign.replyRate.toFixed(1)}%`} />
        </div>

        <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white p-4 border-b border-gray-100 dark:border-brand-surface">Leads in this Campaign ({leads.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-100 dark:border-brand-stroke/20">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Company</th>
                  <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Follow-ups</th>
                  <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Last Contacted</th>
                  <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => ( 
                  <tr key={lead.id} className="border-b border-gray-100 dark:border-brand-surface hover:bg-gray-100/50 dark:hover:bg-brand-surface/50 transition-colors">
                    <td className="p-4 text-gray-900 dark:text-white font-medium">{lead.name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{lead.company}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{lead.followUpCount}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{lead.lastContacted}</td>
                    <td className="p-4">
                      <button onClick={() => handleOpenEmailModal(lead)} className="text-brand-primary hover:underline text-sm font-medium">Generate Email</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
