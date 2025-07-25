
import React, { useState } from 'react';
import { AnalyticsIcon, CampaignIcon, LeadsIcon, LogoIcon, SparkleIcon, UserCircleIcon, InboxIcon } from '../Icons';
import { Plan, PlanName } from '../../types';
import { CheckoutModal } from '../CheckoutModal';


const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <a href={href} onClick={handleClick} className="text-gray-300 hover:text-white transition-colors duration-300">
            {children}
        </a>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-brand-surface/50 backdrop-blur-sm p-6 rounded-xl border border-brand-stroke/20 text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="inline-block p-4 bg-brand-primary/10 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; title: string; avatar: string }> = ({ quote, name, title, avatar }) => (
    <div className="bg-brand-surface p-8 rounded-xl border border-brand-stroke/20 h-full flex flex-col">
        <p className="text-gray-300 flex-grow">"{quote}"</p>
        <div className="flex items-center mt-6">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
            <div className="ml-4">
                <p className="font-bold text-white">{name}</p>
                <p className="text-brand-primary/80 text-sm">{title}</p>
            </div>
        </div>
    </div>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const LandingPlanCard: React.FC<{plan: Plan; isCurrent: boolean; onCtaClick: () => void;}> = ({ plan, isCurrent, onCtaClick }) => {
    const cardClasses = `relative bg-brand-bg p-8 rounded-2xl border ${plan.isPopular ? 'border-brand-primary' : 'border-brand-stroke/20'} flex flex-col`;
    return (
        <div className={cardClasses}>
            {plan.isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
            <h3 className="text-xl font-bold text-white">{plan.planName}</h3>
            <p className="text-gray-400 mt-2 h-10">{plan.description}</p>
            <div className="mt-6">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-gray-400">/month</span>
            </div>
            <ul className="mt-8 space-y-4 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <CheckIcon />
                        <span className="text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={onCtaClick}
                disabled={isCurrent}
                className={`w-full mt-10 font-bold py-3 px-4 rounded-lg transition-all duration-300 ${isCurrent ? 'bg-brand-surface text-gray-500 cursor-not-allowed' : plan.isPopular ? 'bg-brand-primary text-black hover:opacity-90' : 'bg-brand-surface text-white hover:bg-brand-primary hover:text-black'}`}
            >
                {isCurrent ? 'Current Plan' : plan.ctaText}
            </button>
        </div>
    );
};

export const LandingView: React.FC<{onNavigate: (path: string) => void}> = ({ onNavigate }) => {
    
    const plans: Plan[] = [
        {
            planName: 'Starter',
            price: '$29',
            description: 'For small teams and freelancers.',
            features: [ '100 leads/month', 'AI email generation', '5 active campaigns', 'Email support' ],
            ctaText: 'Choose Starter'
        },
        {
            planName: 'Pro',
            price: '$69',
            description: 'For growing businesses and agencies.',
            features: [ 'Unlimited leads', 'Advanced AI personalization', 'A/B testing & Analytics', 'Priority support'],
            isPopular: true,
            ctaText: 'Choose Pro'
        },
        {
            planName: 'Agency',
            price: '$149',
            description: 'For large-scale operations.',
            features: [ 'Everything in Pro', 'Team access (up to 5 seats)', 'API access', 'Dedicated account manager' ],
            ctaText: 'Choose Agency'
        }
    ];

    return (
        <div className="bg-brand-black text-white font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-brand-black/70 backdrop-blur-lg border-b border-brand-stroke/20">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <LogoIcon className="w-8 h-8 text-brand-primary" />
                        <span className="text-2xl font-bold">LeadForge AI</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8 font-medium">
                        <NavLink href="#features">Features</NavLink>
                        <NavLink href="#pricing">Pricing</NavLink>
                        <NavLink href="#testimonials">Testimonials</NavLink>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => onNavigate('/auth')} className="hidden sm:block text-gray-300 hover:text-white font-medium transition-colors">Sign In</button>
                        <button onClick={() => onNavigate('/auth')} className="bg-brand-primary text-black font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity">
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <section id="hero" className="relative text-center py-20 md:py-32 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 via-brand-bg/0 to-brand-primary/10"></div>
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-primary rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-secondary rounded-full opacity-10 blur-3xl"></div>

                    <div className="relative z-10 container mx-auto">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-down">
                            Automate Your Outreach.
                            <br/>
                            <span className="text-brand-primary">Close More Deals.</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
                            LeadForge AI finds your ideal customers, writes personalized emails that get replies, and manages your campaigns—so you can focus on growing your business.
                        </p>
                        <div className="animate-fade-in-down" style={{animationDelay: '0.4s'}}>
                            <button onClick={() => onNavigate('/auth')} className="bg-brand-primary text-black font-bold py-4 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity transform hover:scale-105">
                                Get Started for Free
                            </button>
                            <p className="text-sm text-gray-500 mt-4">No credit card required.</p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 px-6 bg-brand-bg">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Why You'll Love LeadForge AI</h2>
                            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Stop guessing. Start growing. Our AI-powered platform is built for results.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard 
                                icon={<LeadsIcon className="w-8 h-8 text-brand-primary"/>}
                                title="Unlimited Lead Engine"
                                description="Access a database of millions of B2B contacts and find your ideal customer profile in seconds."
                            />
                            <FeatureCard 
                                icon={<SparkleIcon className="w-8 h-8 text-brand-primary"/>}
                                title="AI Copywriter"
                                description="Generate high-converting cold emails and follow-ups tailored to each lead, in any tone."
                            />
                            <FeatureCard 
                                icon={<CampaignIcon className="w-8 h-8 text-brand-primary"/>}
                                title="Automated Campaigns"
                                description="Set up multi-step campaigns with automated follow-ups to ensure you never miss an opportunity."
                            />
                            <FeatureCard 
                                icon={<InboxIcon className="w-8 h-8 text-brand-primary"/>}
                                title="Unified Inbox"
                                description="Manage all your lead conversations in one place and keep track of every reply."
                            />
                        </div>
                    </div>
                </section>
                
                 {/* How it works Section */}
                 <section id="how-it-works" className="py-20 px-6 bg-brand-black">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Launch a Campaign in 3 Simple Steps</h2>
                            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Go from idea to outreach in under 5 minutes.</p>
                        </div>
                        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-stroke/20 hidden md:block"></div>
                            <div className="relative text-center">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 flex items-center justify-center text-5xl font-bold text-brand-surface/80">1</div>
                                <h3 className="text-2xl font-bold text-brand-primary mb-3">Define Target</h3>
                                <p className="text-gray-400">Specify your ideal niche, location, and the problem you solve.</p>
                            </div>
                             <div className="relative text-center">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 flex items-center justify-center text-5xl font-bold text-brand-surface/80">2</div>
                                <h3 className="text-2xl font-bold text-brand-primary mb-3">Generate with AI</h3>
                                <p className="text-gray-400">Our AI finds thousands of matching leads and crafts personalized email sequences.</p>
                            </div>
                             <div className="relative text-center">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 flex items-center justify-center text-5xl font-bold text-brand-surface/80">3</div>
                                <h3 className="text-2xl font-bold text-brand-primary mb-3">Launch & Analyze</h3>
                                <p className="text-gray-400">Start your campaign and watch the replies roll in with our real-time analytics.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Testimonials Section */}
                <section id="testimonials" className="py-20 px-6 bg-brand-bg">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by Top Performers</h2>
                             <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Hear what our users have to say about their success.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <TestimonialCard 
                                avatar="https://randomuser.me/api/portraits/men/32.jpg"
                                name="Johnathan Smith"
                                title="CEO, TechInnovate"
                                quote="LeadForge AI revolutionized our sales process. We booked 50% more meetings in the first month. It's an absolute game-changer for any B2B company."
                            />
                            <TestimonialCard 
                                avatar="https://randomuser.me/api/portraits/women/44.jpg"
                                name="Sarah Jenkins"
                                title="Head of Growth, MarketRise"
                                quote="The AI-generated emails are scarily good. They sound human and get replies. We've cut our prospecting time in half and doubled our reply rate."
                            />
                            <TestimonialCard 
                                avatar="https://randomuser.me/api/portraits/men/46.jpg"
                                name="David Chen"
                                title="Founder, ScaleUp Agency"
                                quote="As an agency, we manage outreach for multiple clients. LeadForge AI allows us to scale our efforts without sacrificing personalization. The results have been incredible."
                            />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-20 px-6 bg-brand-black">
                     <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Find a Plan That's Right For You</h2>
                            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Simple, transparent pricing. Cancel anytime.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {plans.map(plan => (
                                <LandingPlanCard 
                                    key={plan.planName} 
                                    plan={plan}
                                    isCurrent={false}
                                    onCtaClick={() => onNavigate('/auth')}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="cta" className="py-20 px-6 bg-brand-bg">
                    <div className="container mx-auto text-center">
                         <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Grow Your Business?</h2>
                         <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto mb-8">Join thousands of businesses automating their growth with LeadForge AI. Start your free trial today.</p>
                         <button onClick={() => onNavigate('/auth')} className="bg-brand-primary text-black font-bold py-4 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity transform hover:scale-105">
                            Sign Up Now
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-brand-black border-t border-brand-stroke/20">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                         <div className="flex items-center space-x-2">
                            <LogoIcon className="w-6 h-6 text-brand-primary" />
                            <span className="text-xl font-bold">LeadForge AI</span>
                        </div>
                        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} LeadForge AI. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
