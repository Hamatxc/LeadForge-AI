
import React, { useState, useCallback, useEffect } from 'react';
import { Campaign, CampaignStatus } from '../../types';
import { generateColdEmail, generateCampaignStrategy } from '../../services/geminiService';
import { SpinnerIcon } from '../Icons';

const CampaignModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaignData: Omit<Campaign, 'id' | 'status' | 'leadsCount' | 'sentCount' | 'repliesCount' | 'replyRate' | 'createdAt'>) => void;
  campaigns: Campaign[];
  initialData?: Partial<Campaign> | null;
}> = ({ isOpen, onClose, onSave, campaigns, initialData }) => {
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [problem, setProblem] = useState('');
  const [offer, setOffer] = useState('');
  const [tone, setTone] = useState('Persuasive');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);

  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            setNiche(initialData.niche || '');
            setLocation(initialData.location || '');
            setProblem(initialData.problem || '');
            setOffer(initialData.offer || '');
        } else {
            // Reset fields if opened without initial data
            setNiche('');
            setLocation('');
            setProblem('');
            setOffer('');
        }
        // Always reset these when modal opens
        setGeneratedEmail('');
        setTone('Persuasive');
    }
  }, [isOpen, initialData]);


  const handleGenerateEmail = async () => {
    if (!niche || !location || !problem || !offer) {
        alert("Please fill in Niche, Location, Problem, and Offer.");
        return;
    }
    setIsLoading(true);
    setGeneratedEmail('');
    try {
        const email = await generateColdEmail(niche, location, problem, offer, tone);
        setGeneratedEmail(email);
    } catch (error) {
        console.error(error);
        setGeneratedEmail('Failed to generate email. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleGetSuggestion = async () => {
    setIsSuggesting(true);
    try {
        const suggestion = await generateCampaignStrategy(campaigns);
        setNiche(suggestion.niche);
        setLocation(suggestion.location);
        setProblem(suggestion.problem);
        setOffer(suggestion.offer);
    } catch (error) {
        console.error("Failed to get AI suggestion", error);
        alert("Could not generate a suggestion at this time.");
    } finally {
        setIsSuggesting(false);
    }
  };

  const handleSave = () => {
    onSave({
        name: `${niche} Campaign`,
        niche,
        location,
        problem,
        offer,
    });
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/30 w-full max-w-2xl p-8 m-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Campaign</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Target Niche (e.g., SaaS, E-commerce)" value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
          <input type="text" placeholder="Target Location (e.g., USA, London)" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
          <input type="text" placeholder="Problem you solve (e.g., high customer churn)" value={problem} onChange={e => setProblem(e.target.value)} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
          <textarea placeholder="Your Offer (e.g., We help companies scale their SEO)" value={offer} onChange={e => setOffer(e.target.value)} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white min-h-[80px] border-2 border-transparent focus:border-brand-primary focus:outline-none" />
          <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none">
            <option>Persuasive</option>
            <option>Formal</option>
            <option>Casual</option>
            <option>Direct</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={handleGetSuggestion} disabled={isSuggesting || isLoading} className="w-full sm:w-1/2 bg-gray-200 dark:bg-brand-surface text-black dark:text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center">
                {isSuggesting ? <SpinnerIcon className="animate-spin h-5 w-5 mr-3" /> : '💡'}
                {isSuggesting ? 'Thinking...' : 'Suggest Strategy'}
            </button>
            <button onClick={handleGenerateEmail} disabled={isLoading || isSuggesting} className="w-full sm:w-1/2 bg-gradient-to-r from-brand-secondary to-brand-primary text-black font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center">
              {isLoading && <SpinnerIcon className="animate-spin h-5 w-5 mr-3" />}
              {isLoading ? 'Generating...' : '✨ Generate AI Email'}
            </button>
        </div>
        {generatedEmail && (
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Generated Email Template:</h3>
                <textarea readOnly value={generatedEmail} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-700 dark:text-gray-300 min-h-[200px] border border-gray-200 dark:border-brand-stroke/20 focus:outline-none"></textarea>
            </div>
        )}
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="py-2 px-6 bg-gray-200 dark:bg-brand-surface rounded-lg text-gray-900 dark:text-white hover:opacity-80">Cancel</button>
          <button onClick={handleSave} className="py-2 px-6 bg-brand-primary rounded-lg text-black font-bold hover:opacity-90">Save & Find Leads</button>
        </div>
      </div>
    </div>
  );
};

const getStatusStyles = (status: CampaignStatus) => {
    switch (status) {
        case CampaignStatus.Active: return { indicator: 'bg-green-400', text: 'text-green-500 dark:text-green-400' };
        case CampaignStatus.Sending: return { indicator: 'bg-cyan-400', text: 'text-cyan-500 dark:text-cyan-400' };
        case CampaignStatus.Scheduled: return { indicator: 'bg-yellow-400', text: 'text-yellow-500 dark:text-yellow-400' };
        case CampaignStatus.Generating: return { indicator: 'bg-yellow-400', text: 'text-yellow-500 dark:text-yellow-400' };
        case CampaignStatus.Paused: return { indicator: 'bg-orange-400', text: 'text-orange-500 dark:text-orange-400' };
        case CampaignStatus.Completed: return { indicator: 'bg-gray-500', text: 'text-gray-500 dark:text-gray-400' };
        default: return { indicator: 'bg-gray-500', text: 'text-gray-500 dark:text-gray-400' };
    }
};

const CampaignRow: React.FC<{ campaign: Campaign, onViewCampaign: (c: Campaign) => void }> = ({ campaign, onViewCampaign }) => {
    const statusStyles = getStatusStyles(campaign.status);
    const progress = campaign.leadsCount > 0 ? (campaign.sentCount / campaign.leadsCount) * 100 : 0;
    
    return (
        <tr className="border-b border-gray-100 dark:border-brand-surface hover:bg-gray-100/50 dark:hover:bg-brand-surface/50 transition-colors">
          <td className="p-4 text-gray-900 dark:text-white font-medium">{campaign.name}</td>
          <td className="p-4">
            <div className={`flex items-center font-medium text-sm ${statusStyles.text}`}>
                {campaign.status === CampaignStatus.Generating || campaign.status === CampaignStatus.Sending ? (
                    <SpinnerIcon className="animate-spin h-4 w-4 mr-2" />
                ) : (
                    <span className={`h-2.5 w-2.5 rounded-full mr-2 ${statusStyles.indicator}`}></span>
                )}
                {campaign.status}
            </div>
          </td>
          <td className="p-4 text-gray-600 dark:text-gray-300">
            {campaign.status === CampaignStatus.Generating ? '...' : campaign.leadsCount.toLocaleString()}
          </td>
          <td className="p-4 text-gray-600 dark:text-gray-300">
             {campaign.status === CampaignStatus.Sending ? (
                <div className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-cyan-500 dark:text-cyan-400">{campaign.sentCount.toLocaleString()} / {campaign.leadsCount.toLocaleString()}</span>
                        <span className="text-gray-900 dark:text-white">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-brand-surface rounded-full h-1.5">
                        <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            ) : (
                campaign.sentCount.toLocaleString()
            )}
          </td>
          <td className="p-4">
            <span className={`font-medium ${campaign.replyRate > 7 ? 'text-green-500 dark:text-green-400' : 'text-yellow-500 dark:text-yellow-400'}`}>
              {campaign.replyRate.toFixed(1)}%
            </span>
          </td>
          <td className="p-4 text-gray-600 dark:text-gray-300">{campaign.createdAt}</td>
          <td className="p-4">
            <button onClick={() => onViewCampaign(campaign)} className="text-brand-primary hover:underline text-sm font-medium">View</button>
          </td>
        </tr>
    );
};


interface CampaignsViewProps {
  onViewCampaign: (campaign: Campaign) => void;
  onCreateCampaign: (campaignData: Omit<Campaign, 'id' | 'status' | 'leadsCount' | 'sentCount' | 'repliesCount' | 'replyRate' | 'createdAt'>) => void;
  campaigns: Campaign[];
  initialData?: Partial<Campaign> | null;
  clearInitialData?: () => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({ onViewCampaign, onCreateCampaign, campaigns, initialData, clearInitialData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    if (initialData) {
      setIsModalOpen(true);
    }
  }, [initialData]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (clearInitialData) {
      clearInitialData();
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-brand-secondary to-brand-primary text-black font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity">
          + Create New
        </button>
      </div>
      
      <CampaignModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={onCreateCampaign} 
        campaigns={campaigns}
        initialData={initialData}
      />

      <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 dark:border-brand-stroke/20">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Campaign Name</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Leads</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Sent</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Reply Rate</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Created</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <CampaignRow key={campaign.id} campaign={campaign} onViewCampaign={onViewCampaign} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
