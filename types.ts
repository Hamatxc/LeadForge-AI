
export type View = 'Dashboard' | 'Campaigns' | 'Leads' | 'Inbox' | 'Analytics' | 'Billing' | 'Notifications' | 'Settings';

export type PlanName = 'Free' | 'Starter' | 'Pro' | 'Agency';

export interface Plan {
    planName: PlanName;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    ctaText: string;
}

export enum LeadStatus {
    New = 'New',
    Contacted = 'Contacted',
    Replied = 'Replied',
    Interested = 'Interested',
    NotInterested = 'Not Interested',
}

export enum CampaignStatus {
    Generating = 'Generating Leads',
    Active = 'Active',
    Completed = 'Completed',
    Scheduled = 'Scheduled',
    Sending = 'Sending',
    Paused = 'Paused',
}

export enum LeadTag {
    Hot = 'Hot',
    Warm = 'Warm',
    Cold = 'Cold',
}

export interface Lead {
    id: string;
    campaignId: string;
    name: string;
    company: string;
    email: string;
    status: LeadStatus;
    lastContacted: string;
    followUpCount: number;
    tags?: LeadTag[];
    followUpIn?: number; // For simulation: ticks until next follow-up
}

export interface Message {
    id: string;
    from: 'user' | 'lead';
    subject?: string;
    body: string;
    timestamp: string;
}

export interface Conversation {
    leadId: string;
    messages: Message[];
}


export interface CampaignSchedule {
    startDate: string;
    timeWindow: { start: string; end: string; };
    emailsPerDay: number;
}


export interface Campaign {
    id: string;
    name: string;
    niche: string;
    location: string;
    problem: string;
    offer: string;
    status: CampaignStatus;
    leadsCount: number;
    sentCount: number;
    repliesCount: number; // For accurate rate calculation
    replyRate: number;
    createdAt: string;
    schedule?: CampaignSchedule;
    generationStartTime?: number; // For simulation
}

export interface CampaignPerformance {
    name: string;
    sent: number;
    opened: number;
    clicks: number;
    replied: number;
    bounces: number;
}

export interface AIInsight {
  type: 'subject_line' | 'template' | 'strategy' | 'optimization';
  content: string; // The core suggestion (e.g., subject line, template snippet, description of strategy/optimization)
  reason: string;
  performanceMetric: string; // "21% higher open rate", "Top 5% performer"
  targetCampaignName?: string; // Optional field to link an optimization to a specific low-performing campaign
  strategyDetails?: { // Optional field to carry structured data for a strategy suggestion
      niche: string;
      problem: string;
      offer: string;
  }
}

export interface AnalyticsData {
    monthlyPerformance: { name: string; openRate: number; replyRate: number, clickRate: number }[];
    campaignPerformance: CampaignPerformance[];
    leadStatusDistribution: { name: string; value: number }[];
    aiInsights: AIInsight[];
}

export interface Integration {
    provider: 'Gmail';
    account: string;
}

// Settings Page Types

export type AITone = 'Professional' | 'Friendly' | 'Persuasive' | 'Casual';
export type AIEmailLength = 'Short & Punchy' | 'Medium' | 'Detailed';
export type AIFollowUpStyle = 'Gentle Reminder' | 'Value Add' | 'Direct Question';

export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Mandarin Chinese' | 'Hindi' | 'Arabic' | 'Portuguese' | 'Bengali' | 'Russian' | 'Japanese' | 'Italian' | 'Korean' | 'Dutch' | 'Swedish' | 'Turkish' | 'Polish' | 'Indonesian' | 'Thai' | 'Vietnamese' | 'Hebrew' | 'Danish' | 'Finnish' | 'Norwegian' | 'Czech' | 'Hungarian' | 'Romanian' | 'Ukrainian' | 'Greek';

export interface UserSettings {
    profile: {
        name: string;
        email: string;
        avatar: string;
    };
    ui: {
        darkMode: boolean;
        language: Language;
    };
    ai: {
        tone: AITone;
        emailLength: AIEmailLength;
        followUpStyle: AIFollowUpStyle;
    };
    email: {
        signature: string;
        dailySendLimit: number;
        useRandomDelay: boolean;
        sendingHours: { start: string; end: string };
    };
    followUp: {
        count: number;
        delayDays: number;
        overrideWithCustomReplies: boolean;
    };
    campaignDefaults: {
        niche: string;
        location: string;
        offerTemplate: string;
        ctaTemplate: string;
    };
    security: {
        twoFactorEnabled: boolean;
        apiKey: string;
    };
}
