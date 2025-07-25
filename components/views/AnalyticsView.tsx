
import React, { useState, useEffect, useMemo } from 'react';
import { AIInsight, Campaign } from '../../types';
import { generateAnalyticsInsights } from '../../services/geminiService';
import { SparkleIcon, DocumentTextIcon, ChatBubbleIcon, SpinnerIcon, AnalyticsIcon } from '../Icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the line chart, as time-series data isn't available in campaigns
const monthlyPerformanceData = [
    { name: 'Jan', openRate: 22, replyRate: 4, clickRate: 6 },
    { name: 'Feb', openRate: 25, replyRate: 5, clickRate: 8 },
    { name: 'Mar', openRate: 31, replyRate: 6, clickRate: 9 },
    { name: 'Apr', openRate: 28, replyRate: 5.5, clickRate: 8.5 },
    { name: 'May', openRate: 35, replyRate: 7, clickRate: 11 },
    { name: 'Jun', openRate: 42, replyRate: 8.2, clickRate: 12 },
];

const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-white dark:bg-brand-bg p-6 rounded-xl border border-gray-200 dark:border-brand-stroke/20">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </div>
);

const ChartContainer: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-brand-bg p-6 rounded-xl border border-gray-200 dark:border-brand-stroke/20">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{title}</h3>
    <div style={{ width: '100%', height: 300 }}>
      {children}
    </div>
  </div>
);

const InsightIcon: React.FC<{type: AIInsight['type']}> = ({type}) => {
    const commonClasses = "w-6 h-6 text-gray-700 dark:text-gray-300";
    switch(type) {
        case 'strategy':
            return <SparkleIcon className={commonClasses} />;
        case 'optimization':
            return <AnalyticsIcon className={commonClasses} />;
        case 'subject_line':
            return <ChatBubbleIcon className={commonClasses} />;
        case 'template':
            return <DocumentTextIcon className={commonClasses} />;
        default:
            return <SparkleIcon className={commonClasses} />;
    }
}

interface AnalyticsViewProps {
    campaigns: Campaign[];
    onUseStrategy: (strategy: NonNullable<AIInsight['strategyDetails']>) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ campaigns, onUseStrategy }) => {
  const [isDark, setIsDark] = useState(true);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);

  useEffect(() => {
      const observer = new MutationObserver(() => {
          setIsDark(document.documentElement.classList.contains('dark'));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      setIsDark(document.documentElement.classList.contains('dark'));
      return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const fetchInsights = async () => {
        if (campaigns && campaigns.length > 0) {
            setIsLoadingInsights(true);
            try {
                const insightsString = await generateAnalyticsInsights(campaigns);
                const parsedInsights = JSON.parse(insightsString);
                setInsights(parsedInsights);
            } catch (error) {
                console.error("Failed to parse insights:", error);
                setInsights([]); // Set to empty on error
            } finally {
                setIsLoadingInsights(false);
            }
        } else {
             setIsLoadingInsights(false);
             setInsights([]);
        }
    };
    fetchInsights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const overallStats = useMemo(() => {
      if (!campaigns || campaigns.length === 0) {
        return { openRate: 0, clickRate: 0, replyRate: 0, bounceRate: 0 };
      }
      const totals = campaigns.reduce((acc, campaign) => {
          // Note: Open, click, and bounce rates are not in the Campaign model.
          // We are using replyRate and sentCount for this calculation.
          // This is a simplification. A real app would track all these metrics.
          const replies = (campaign.replyRate / 100) * campaign.sentCount;
          acc.sent += campaign.sentCount;
          acc.replies += replies;
          return acc;
      }, { sent: 0, replies: 0 });
      
      return {
          openRate: 38.4, // Using static data as open rate is not available
          clickRate: 10.2, // Using static data as click rate is not available
          replyRate: totals.sent > 0 ? (totals.replies / totals.sent) * 100 : 0,
          bounceRate: 1.8, // Using static data as bounce rate is not available
      }
  }, [campaigns]);


  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-brand-surface p-3 rounded-lg border border-gray-200 dark:border-brand-stroke/30 text-sm">
          <p className="label font-bold text-gray-900 dark:text-white">{`${label}`}</p>
          {payload.map((p: any) => (
            <p key={p.name} style={{ color: p.color }}>{`${p.name}: ${p.value}`}{p.unit || ''}</p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  const axisColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
  const legendStyle = { color: isDark ? '#fff' : '#374151' };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Open Rate" value={`${overallStats.openRate.toFixed(1)}%`} />
        <StatCard title="Overall Click Rate" value={`${overallStats.clickRate.toFixed(1)}%`} />
        <StatCard title="Overall Reply Rate" value={`${overallStats.replyRate.toFixed(1)}%`} />
        <StatCard title="Overall Bounce Rate" value={`${overallStats.bounceRate.toFixed(1)}%`} />
      </div>

       <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-secondary/80 to-brand-primary/80 dark:from-brand-secondary/30 dark:to-brand-primary/30 border border-brand-stroke/10">
          <div className="flex items-center space-x-3 mb-4">
              <SparkleIcon className="w-7 h-7 text-black dark:text-white" />
              <h3 className="text-xl font-bold text-black dark:text-white">AI Feedback &amp; Optimization</h3>
          </div>
          <p className="text-sm text-black/70 dark:text-white/70 mb-6">Suggestions from Gemini to boost your next campaign's performance based on your historical data.</p>
          {isLoadingInsights ? (
               <div className="flex items-center justify-center h-40">
                   <SpinnerIcon className="w-8 h-8 animate-spin text-black dark:text-white" />
               </div>
           ) : insights.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {insights.map((insight, index) => (
                        <div key={index} className="bg-white/50 dark:bg-brand-bg/50 p-4 rounded-xl backdrop-blur-sm flex flex-col">
                            <div className="flex items-start space-x-3 mb-2">
                                <InsightIcon type={insight.type} />
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white capitalize">{insight.type.replace('_', ' ')}</h4>
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-primary/80 text-black">{insight.performanceMetric}</span>
                                </div>
                            </div>
                             {insight.targetCampaignName && <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">For campaign: <span className="font-semibold">{insight.targetCampaignName}</span></p>}
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex-grow">"{insight.content}"</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{insight.reason}</p>
                            {insight.type === 'strategy' && insight.strategyDetails && (
                                <button onClick={() => onUseStrategy(insight.strategyDetails)} className="mt-4 w-full text-center text-sm font-bold bg-brand-primary text-black py-2 rounded-lg hover:opacity-80 transition-opacity">Use this Strategy</button>
                            )}
                        </div>
                    ))}
                </div>
           ): (
               <div className="text-center bg-white/50 dark:bg-brand-bg/50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-800 dark:text-white">Not Enough Data</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Run more campaigns to get personalized AI feedback.</p>
                </div>
           )}
       </div>

      <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/20">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white p-4 border-b border-gray-200 dark:border-brand-surface">Campaign Performance Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 dark:border-brand-stroke/20">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Campaign</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400 text-center">Sent</th>
                <th className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400 text-center">Reply %</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                    <tr key={campaign.name} className="border-b border-gray-100 dark:border-brand-surface last:border-b-0 hover:bg-gray-50 dark:hover:bg-brand-surface/30 transition-colors">
                      <td className="p-4 text-gray-900 dark:text-white font-medium">{campaign.name}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300 text-center">{campaign.sentCount.toLocaleString()}</td>
                      <td className={`p-4 text-center font-bold ${campaign.replyRate > 7 ? 'text-green-500 dark:text-green-400' : 'text-yellow-500 dark:text-yellow-400'}`}>{campaign.replyRate.toFixed(1)}%</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      
       <ChartContainer title="Monthly Performance Trends">
          <ResponsiveContainer>
            <LineChart data={monthlyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={axisColor} tick={{ fill: axisColor }} />
              <YAxis stroke={axisColor} tick={{ fill: axisColor }} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={legendStyle}/>
              <Line type="monotone" dataKey="openRate" name="Open Rate" stroke="#00FFFF" strokeWidth={2} unit="%" />
              <Line type="monotone" dataKey="clickRate" name="Click Rate" stroke="#B388EB" strokeWidth={2} unit="%" />
              <Line type="monotone" dataKey="replyRate" name="Reply Rate" stroke="#82ca9d" strokeWidth={2} unit="%" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

    </div>
  );
};
