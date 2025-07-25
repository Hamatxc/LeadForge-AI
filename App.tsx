
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/views/DashboardView';
import { CampaignsView } from './components/views/CampaignsView';
import { LeadsView } from './components/views/LeadsView';
import { InboxView } from './components/views/InboxView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { BillingView } from './components/views/BillingView';
import { NotificationsView } from './components/views/NotificationsView';
import { SettingsView } from './components/views/SettingsView';
import { View, Campaign, PlanName, Integration, CampaignStatus, UserSettings, AIInsight, Lead, LeadStatus, Conversation, LeadTag, Message } from './types';
import { CampaignDetailView } from './components/views/CampaignDetailView';
import { AuthView } from './components/views/AuthView';
import { LandingView } from './components/views/LandingView';


const defaultSettings: UserSettings = {
    profile: {
        name: 'Alex Starr',
        email: 'alex.starr@example.com',
        avatar: 'https://picsum.photos/100/100',
    },
    ui: {
        darkMode: true,
        language: 'English',
    },
    ai: {
        tone: 'Persuasive',
        emailLength: 'Medium',
        followUpStyle: 'Gentle Reminder',
    },
    email: {
        signature: 'Best regards,\nAlex Starr',
        dailySendLimit: 100,
        useRandomDelay: true,
        sendingHours: { start: '09:00', end: '17:00' },
    },
    followUp: {
        count: 3,
        delayDays: 2,
        overrideWithCustomReplies: true,
    },
    campaignDefaults: {
        niche: 'SaaS',
        location: 'USA',
        offerTemplate: 'We help SaaS companies reduce churn with our analytics platform.',
        ctaTemplate: 'Are you available for a quick 15-minute chat next week?',
    },
    security: {
        twoFactorEnabled: false,
        apiKey: `sk-lfai-${Math.random().toString(36).substring(2)}`,
    },
};

const validViews: View[] = ['Dashboard', 'Campaigns', 'Leads', 'Inbox', 'Analytics', 'Billing', 'Notifications', 'Settings'];
const isValidView = (viewName: string): viewName is View => validViews.includes(viewName as View);

// Helper to get path from hash, e.g. #/dashboard -> /dashboard
const getPathFromHash = () => {
    const hash = window.location.hash;
    // For #/dashboard, return /dashboard. For #/auth, return /auth.
    // If hash is empty, #, or #/, treat as root.
    if (!hash || hash === '#' || hash === '#/') {
        return '/';
    }
    return hash.startsWith('#') ? hash.substring(1) : hash;
};

const getViewFromPath = (path: string): View => {
    // path is like "/dashboard" or "/auth"
    const viewNamePart = path.substring(1); // "dashboard" or "auth"
    if (!viewNamePart) return 'Dashboard';
    
    const viewName = viewNamePart.charAt(0).toUpperCase() + viewNamePart.slice(1);
    return isValidView(viewName) ? viewName : 'Dashboard';
}


const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const isLandingPage = currentPath === '/';
  const isAuthPage = currentPath === '/auth';
  const isAuthenticated = !isLandingPage && !isAuthPage;
  
  const [activeView, setActiveView] = useState<View>(getViewFromPath(currentPath));
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [currentPlan, setCurrentPlan] = useState<PlanName>('Pro');
  const [integration, setIntegration] = useState<Integration | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>(defaultSettings);
  const [campaignToCreate, setCampaignToCreate] = useState<Partial<Campaign> | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (userSettings.ui.darkMode) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
  }, [userSettings.ui.darkMode]);

  // Handle browser navigation (back/forward buttons) using hashchange
  useEffect(() => {
    const onHashChange = () => setCurrentPath(getPathFromHash());
    window.addEventListener('hashchange', onHashChange);
    // The initial call to onHashChange() is removed to ensure the app always starts on the landing page.
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Sync activeView with currentPath
  useEffect(() => {
      setActiveView(getViewFromPath(currentPath));
      if (isAuthPage || isLandingPage) {
        setSelectedCampaign(null);
      }
  }, [currentPath, isAuthPage, isLandingPage]);


  // MASTER AUTOMATION SIMULATION LOOP
  useEffect(() => {
    const simulationTick = setInterval(() => {
        let campaignsUpdated = false;
        let leadsUpdated = false;
        let conversationsUpdated = false;

        const updatedCampaigns = [...campaigns];
        const updatedLeads = [...leads];
        const updatedConversations = [...conversations];

        // 1. Process Campaigns (Lead Gen & Sending)
        for (let i = 0; i < updatedCampaigns.length; i++) {
            const campaign = { ...updatedCampaigns[i] };

            // A. Lead Generation Simulation
            if (campaign.status === CampaignStatus.Generating && Date.now() - (campaign.generationStartTime || 0) > 5000) {
                const generatedLeadsCount = Math.floor(Math.random() * (1500 - 150)) + 150;
                const newLeads: Lead[] = Array.from({ length: generatedLeadsCount }, (_, j) => ({
                    id: `${campaign.id}-lead-${j}`, campaignId: campaign.id, name: `Lead ${j + 1}`,
                    company: `${campaign.niche} Co. ${j + 1}`, email: `lead${j}.${campaign.id}@example.com`,
                    status: LeadStatus.New, lastContacted: 'N/A', followUpCount: 0,
                }));
                updatedLeads.push(...newLeads);
                campaign.leadsCount = generatedLeadsCount;
                campaign.status = CampaignStatus.Sending; // Auto-start
                campaignsUpdated = true;
                leadsUpdated = true;
            }

            // B. Email Sending Simulation
            if (campaign.status === CampaignStatus.Sending && campaign.sentCount < campaign.leadsCount) {
                const leadToSend = updatedLeads.find(l => l.campaignId === campaign.id && l.status === LeadStatus.New);
                if (leadToSend) {
                    leadToSend.status = LeadStatus.Contacted;
                    leadToSend.lastContacted = new Date().toISOString().split('T')[0];
                    leadToSend.followUpIn = 3; // Follow up in 3 ticks
                    campaign.sentCount++;

                    // Create initial conversation message
                    const initialMessage = { id: `msg-${leadToSend.id}-1`, from: 'user' as const, subject: `Regarding ${campaign.niche}`, body: `Hi ${leadToSend.name.split(' ')[0]}, reaching out about ${campaign.problem}...`, timestamp: new Date().toLocaleTimeString() };
                    updatedConversations.push({ leadId: leadToSend.id, messages: [initialMessage] });
                    conversationsUpdated = true;

                    if (campaign.sentCount >= campaign.leadsCount) {
                        campaign.status = CampaignStatus.Completed;
                    }
                    campaignsUpdated = true;
                    leadsUpdated = true;
                }
            }
            updatedCampaigns[i] = campaign;
        }

        // 2. Process Leads (Replies & Follow-ups)
        for (let i = 0; i < updatedLeads.length; i++) {
            const lead = { ...updatedLeads[i] };
            if (lead.status === LeadStatus.Contacted) {
                // A. Reply Simulation
                if (Math.random() < 0.03) { // 3% chance to reply this tick
                    lead.status = LeadStatus.Replied;
                    const parentCampaign = updatedCampaigns.find(c => c.id === lead.campaignId);
                    if (parentCampaign) {
                        parentCampaign.repliesCount++;
                        parentCampaign.replyRate = (parentCampaign.repliesCount / parentCampaign.sentCount) * 100;
                        campaignsUpdated = true;
                    }

                    const conv = updatedConversations.find(c => c.leadId === lead.id);
                    if (conv) {
                        conv.messages.push({ id: `msg-${lead.id}-reply`, from: 'lead', body: 'This sounds interesting, tell me more.', timestamp: new Date().toLocaleTimeString() });
                        conversationsUpdated = true;
                    }
                } 
                // B. Follow-up Simulation
                else {
                    lead.followUpIn = (lead.followUpIn ?? 1) - 1;
                    if (lead.followUpIn <= 0 && lead.followUpCount < userSettings.followUp.count) {
                        lead.followUpCount++;
                        lead.followUpIn = 3; // Reset timer

                        const conv = updatedConversations.find(c => c.leadId === lead.id);
                        if (conv) {
                            conv.messages.push({ id: `msg-${lead.id}-fu${lead.followUpCount}`, from: 'user', body: 'Just following up on my previous message.', timestamp: new Date().toLocaleTimeString() });
                            conversationsUpdated = true;
                        }
                    }
                }
                leadsUpdated = true;
            }
            updatedLeads[i] = lead;
        }

        if (campaignsUpdated) setCampaigns(updatedCampaigns);
        if (leadsUpdated) setLeads(updatedLeads);
        if (conversationsUpdated) setConversations(updatedConversations);

    }, 2000); // Run tick every 2 seconds

    return () => clearInterval(simulationTick);
  }, [campaigns, leads, conversations, userSettings.followUp.count]);

  const navigate = useCallback((path: string) => {
    if (path === '/') {
      window.location.hash = '';
    } else {
      window.location.hash = path;
    }
  }, []);

  const handleLogin = useCallback(() => navigate('/dashboard'), [navigate]);
  const handleLogout = useCallback(() => navigate('/'), [navigate]);

  const handleNavClick = useCallback((view: View) => {
    navigate(`/${view.toLowerCase()}`);
    setSelectedCampaign(null);
  }, [navigate]);

  const handleViewCampaign = useCallback((campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setActiveView('Campaigns'); 
  }, []);

  const handleBackToCampaigns = useCallback(() => {
    setSelectedCampaign(null);
  }, []);

  const handleUpgradePlan = useCallback((plan: PlanName) => {
    setCurrentPlan(plan);
    navigate('/billing');
  }, [navigate]);
  
  const handleIntegrationChange = useCallback((newIntegration: Integration | null) => {
    setIntegration(newIntegration);
  }, []);
  
  const handleSettingsChange = useCallback((newSettings: UserSettings) => {
      setUserSettings(newSettings);
  }, []);
  
  const handleCreateCampaign = useCallback((campaignData: Omit<Campaign, 'id' | 'status' | 'leadsCount' | 'sentCount' | 'repliesCount' | 'replyRate' | 'createdAt' | 'generationStartTime'>) => {
      const newCampaign: Campaign = {
          ...campaignData,
          id: String(Date.now()),
          status: CampaignStatus.Generating,
          leadsCount: 0,
          sentCount: 0,
          repliesCount: 0,
          replyRate: 0,
          createdAt: new Date().toISOString().split('T')[0],
          generationStartTime: Date.now()
      };
      setCampaigns(prev => [newCampaign, ...prev]);
      navigate('/campaigns');
  }, [navigate]);

  const handleCampaignUpdate = useCallback((updatedCampaign: Campaign) => {
      setCampaigns(prev => prev.map(c => c.id === updatedCampaign.id ? updatedCampaign : c));
      if (selectedCampaign?.id === updatedCampaign.id) {
          setSelectedCampaign(updatedCampaign);
      }
  }, [selectedCampaign]);

  const handleUseStrategy = useCallback((strategy: NonNullable<AIInsight['strategyDetails']>) => {
    setCampaignToCreate({ niche: strategy.niche, problem: strategy.problem, offer: strategy.offer, location: '' });
    navigate('/campaigns');
  }, [navigate]);

  const handleSendReply = useCallback((leadId: string, messageBody: string) => {
    setConversations(prev => {
        const newConversations = [...prev];
        const convIndex = newConversations.findIndex(c => c.leadId === leadId);
        const newMessage: Message = { id: `msg-manual-${Date.now()}`, from: 'user', body: messageBody, timestamp: new Date().toLocaleTimeString() };
        
        if (convIndex > -1) {
            newConversations[convIndex].messages.push(newMessage);
        } else {
            newConversations.push({ leadId, messages: [newMessage] });
        }
        return newConversations;
    });
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, lastContacted: new Date().toISOString().split('T')[0] } : l));
  }, []);

  const handleToggleTag = useCallback((leadId: string, tag: LeadTag) => {
    setLeads(prev => prev.map(lead => {
        if (lead.id === leadId) {
            const newTags = lead.tags?.includes(tag) ? lead.tags.filter(t => t !== tag) : [...(lead.tags || []), tag];
            return { ...lead, tags: newTags };
        }
        return lead;
    }));
  }, []);


  const renderView = () => {
    if (selectedCampaign) {
      return <CampaignDetailView 
                campaign={selectedCampaign} 
                leads={leads.filter(l => l.campaignId === selectedCampaign.id)}
                onBack={handleBackToCampaigns} 
                integration={integration} 
                onUpdateCampaign={handleCampaignUpdate} 
                userSettings={userSettings} />;
    }

    switch (activeView) {
      case 'Dashboard':
        return <DashboardView setActiveView={handleNavClick} userSettings={userSettings} campaigns={campaigns} />;
      case 'Campaigns':
        return <CampaignsView 
                    onViewCampaign={handleViewCampaign} 
                    onCreateCampaign={handleCreateCampaign} 
                    campaigns={campaigns} 
                    initialData={campaignToCreate}
                    clearInitialData={() => setCampaignToCreate(null)}
                />;
      case 'Leads':
        return <LeadsView leads={leads} />;
      case 'Inbox':
        return <InboxView leads={leads} conversations={conversations} onSendReply={handleSendReply} onToggleTag={handleToggleTag} />;
      case 'Analytics':
        return <AnalyticsView campaigns={campaigns} onUseStrategy={handleUseStrategy} />;
      case 'Billing':
        return <BillingView currentPlan={currentPlan} onUpgrade={handleUpgradePlan} />;
      case 'Notifications':
        return <NotificationsView />;
      case 'Settings':
        return <SettingsView 
                    integration={integration} 
                    onIntegrationChange={handleIntegrationChange}
                    settings={userSettings}
                    onSettingsChange={handleSettingsChange}
                />;
      default:
        return <DashboardView setActiveView={handleNavClick} userSettings={userSettings} campaigns={campaigns}/>;
    }
  };
  
  const getHeaderTitle = () => {
    if (selectedCampaign) {
        return `Campaign: ${selectedCampaign.name}`;
    }
    return activeView;
  }

  if (isLandingPage) {
    return <LandingView onNavigate={(path) => navigate(path)} />;
  }

  if (isAuthPage) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen text-gray-900 dark:text-gray-200 font-sans">
      <Sidebar activeView={activeView} onNavClick={handleNavClick} currentPlan={currentPlan} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getHeaderTitle()} onNavClick={handleNavClick} userSettings={userSettings} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
