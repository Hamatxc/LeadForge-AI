
import React, { useState, useMemo } from 'react';
import { Lead, LeadStatus, LeadTag } from '../../types';

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

interface LeadsViewProps {
    leads: Lead[];
}

export const LeadsView: React.FC<LeadsViewProps> = ({ leads }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Leads</h1>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input 
          type="text" 
          placeholder="Search by name or company..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 bg-white dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-gray-200 dark:border-transparent focus:border-brand-primary focus:outline-none"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
          className="w-full md:w-1/4 bg-white dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-gray-200 dark:border-transparent focus:border-brand-primary focus:outline-none"
        >
          <option value="all">All Statuses</option>
          {Object.values(LeadStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 dark:border-brand-stroke/20">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Company</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Email</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Follow-ups</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Last Contacted</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 dark:border-brand-surface hover:bg-gray-100/50 dark:hover:bg-brand-surface/50 transition-colors">
                  <td className="p-4 text-gray-900 dark:text-white font-medium">{lead.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{lead.company}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{lead.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{lead.followUpCount}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{lead.lastContacted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
