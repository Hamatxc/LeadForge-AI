
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Lead, LeadStatus, LeadTag, Message, Conversation } from '../../types';
import { UserCircleIcon } from '../Icons';

const Tag: React.FC<{ tag: LeadTag }> = ({ tag }) => {
    const styles = {
        [LeadTag.Hot]: 'bg-red-500/20 text-red-400',
        [LeadTag.Warm]: 'bg-orange-500/20 text-orange-400',
        [LeadTag.Cold]: 'bg-blue-500/20 text-blue-400',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${styles[tag]}`}>{tag}</span>;
};

interface InboxViewProps {
    leads: Lead[];
    conversations: Conversation[];
    onSendReply: (leadId: string, message: string) => void;
    onToggleTag: (leadId: string, tag: LeadTag) => void;
}

export const InboxView: React.FC<InboxViewProps> = ({ leads, conversations, onSendReply, onToggleTag }) => {
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.id || null);
    const [activeFilter, setActiveFilter] = useState<LeadTag | 'All'>('All');
    const [replyMessage, setReplyMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        if (!selectedLeadId && leads.length > 0) {
            setSelectedLeadId(leads[0].id);
        }
    }, [leads, selectedLeadId]);

    useEffect(() => {
        scrollToBottom();
    }, [conversations, selectedLeadId]);

    const handleSendReply = () => {
        if (!replyMessage.trim() || !selectedLeadId) return;
        onSendReply(selectedLeadId, replyMessage.trim());
        setReplyMessage('');
    };

    const filteredLeads = useMemo(() => {
        const sortedLeads = [...leads].sort((a,b) => new Date(b.lastContacted).getTime() - new Date(a.lastContacted).getTime());
        if (activeFilter === 'All') return sortedLeads;
        return sortedLeads.filter(lead => lead.tags?.includes(activeFilter));
    }, [leads, activeFilter]);
    
    const selectedLead = useMemo(() => leads.find(l => l.id === selectedLeadId), [leads, selectedLeadId]);
    const selectedConversation = useMemo(() => conversations.find(c => c.leadId === selectedLeadId), [conversations, selectedLeadId]);

    const FilterButton: React.FC<{label: LeadTag | 'All'}> = ({ label }) => {
        const isActive = activeFilter === label;
        return (
             <button 
                onClick={() => setActiveFilter(label)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-brand-primary text-black' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-brand-surface'}`}
            >
                {label}
            </button>
        )
    };
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inbox</h1>
            <div className="flex h-[calc(100vh-200px)] bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/20 overflow-hidden">
                {/* Left Panel: Conversation List */}
                <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-100 dark:border-brand-surface flex flex-col">
                    <div className="p-4 border-b border-gray-100 dark:border-brand-surface">
                        <div className="flex space-x-2">
                           <FilterButton label="All" />
                           <FilterButton label={LeadTag.Hot} />
                           <FilterButton label={LeadTag.Warm} />
                           <FilterButton label={LeadTag.Cold} />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filteredLeads.map(lead => (
                            <button key={lead.id} onClick={() => setSelectedLeadId(lead.id)} className={`w-full text-left p-4 border-b border-gray-100 dark:border-brand-surface transition-colors ${selectedLeadId === lead.id ? 'bg-brand-primary/10' : 'hover:bg-gray-50 dark:hover:bg-brand-surface/50'}`}>
                                <div className="flex justify-between items-start">
                                    <p className="font-semibold text-gray-900 dark:text-white">{lead.name}</p>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">{lead.lastContacted.split(' ')[0]}</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{lead.company}</p>
                                {lead.tags && lead.tags.length > 0 &&
                                    <div className="flex space-x-2 mt-2">
                                        {lead.tags.map(tag => <Tag key={tag} tag={tag} />)}
                                    </div>
                                }
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Center Panel: Email Thread */}
                {selectedLead && selectedConversation ? (
                    <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col">
                        <div className="p-4 border-b border-gray-100 dark:border-brand-surface">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{selectedConversation.messages[0].subject}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">To: {selectedLead.name} &lt;{selectedLead.email}&gt;</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {selectedConversation.messages.map(message => (
                                <div key={message.id} className={`flex items-end gap-3 ${message.from === 'user' ? 'flex-row-reverse' : ''}`}>
                                     <div className={`w-10 h-10 rounded-full flex-shrink-0 ${message.from === 'user' ? 'bg-brand-secondary' : 'bg-brand-primary'} flex items-center justify-center`}>
                                        <UserCircleIcon className="w-6 h-6 text-black"/>
                                     </div>
                                    <div className={`p-4 rounded-2xl max-w-lg ${message.from === 'user' ? 'bg-brand-primary/20 dark:bg-brand-primary/10 text-gray-800 dark:text-gray-200 rounded-br-none' : 'bg-gray-100 dark:bg-brand-surface text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                        <p className="text-sm">{message.body}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">{message.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                             <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t border-gray-100 dark:border-brand-surface">
                            <textarea 
                                placeholder={`Reply to ${selectedLead.name}...`} 
                                className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none min-h-[100px]"
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendReply();
                                    }
                                }}
                            />
                            <div className="flex justify-end mt-2">
                                <button 
                                    onClick={handleSendReply} 
                                    disabled={!replyMessage.trim()}
                                    className="bg-brand-primary text-black font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                                    Send Reply
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                     <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center justify-center text-center p-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No conversation found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">There are no messages for this lead yet, or the lead has not been contacted.</p>
                    </div>
                )}

                {/* Right Panel: Lead Details & Tags */}
                {selectedLead && (
                    <div className="hidden lg:flex w-1/4 border-l border-gray-100 dark:border-brand-surface flex-col p-6 space-y-6">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto">
                                <UserCircleIcon className="w-12 h-12 text-brand-primary"/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{selectedLead.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedLead.company}</p>
                        </div>
                        <div className="border-t border-gray-100 dark:border-brand-surface pt-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Contact Info</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedLead.email}</p>
                        </div>
                         <div className="border-t border-gray-100 dark:border-brand-surface pt-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Lead Temperature</h4>
                            <div className="flex flex-col space-y-2">
                                {Object.values(LeadTag).map(tag => {
                                    const isTagged = selectedLead.tags?.includes(tag);
                                    const styles = {
                                        [LeadTag.Hot]: 'border-red-500/50 hover:bg-red-500/10',
                                        [LeadTag.Warm]: 'border-orange-500/50 hover:bg-orange-500/10',
                                        [LeadTag.Cold]: 'border-blue-500/50 hover:bg-blue-500/10',
                                    };
                                     const activeStyles = {
                                        [LeadTag.Hot]: 'bg-red-500/20 text-red-400 border-red-500/20',
                                        [LeadTag.Warm]: 'bg-orange-500/20 text-orange-400 border-orange-500/20',
                                        [LeadTag.Cold]: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
                                    };
                                    return (
                                        <button 
                                            key={tag}
                                            onClick={() => onToggleTag(selectedLead.id, tag)}
                                            className={`w-full p-2 rounded-lg border-2 text-sm font-semibold transition-colors ${isTagged ? activeStyles[tag] : `text-gray-600 dark:text-gray-300 border-gray-200 dark:border-brand-surface ${styles[tag]}`}`}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
