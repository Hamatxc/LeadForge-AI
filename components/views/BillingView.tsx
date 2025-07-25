
import React, { useState } from 'react';
import { PlanName, Plan } from '../../types';
import { CheckoutModal } from '../CheckoutModal';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

interface PlanCardProps extends Plan {
    isCurrent: boolean;
    onCtaClick: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ planName, price, description, features, isCurrent, isPopular, ctaText, onCtaClick }) => {
    const cardClasses = `relative bg-white dark:bg-brand-bg p-8 rounded-2xl border ${isPopular ? 'border-brand-primary' : 'border-gray-200 dark:border-brand-stroke/20'} flex flex-col`;

    return (
        <div className={cardClasses}>
            {isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{planName}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 h-10">{description}</p>
            <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{price}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <ul className="mt-8 space-y-4 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <CheckIcon />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={onCtaClick}
                disabled={isCurrent}
                className={`w-full mt-10 font-bold py-3 px-4 rounded-lg transition-all duration-300 ${isCurrent ? 'bg-gray-100 dark:bg-brand-surface text-gray-400 dark:text-gray-500 cursor-not-allowed' : isPopular ? 'bg-brand-primary text-black hover:opacity-90' : 'bg-gray-100 dark:bg-brand-surface text-gray-900 dark:text-white hover:bg-brand-primary hover:text-black'}`}
            >
                {isCurrent ? 'Current Plan' : ctaText}
            </button>
        </div>
    );
};


interface BillingViewProps {
    currentPlan: PlanName;
    onUpgrade: (plan: PlanName) => void;
}

export const BillingView: React.FC<BillingViewProps> = ({ currentPlan, onUpgrade }) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);

    const plans: Plan[] = [
        {
            planName: 'Free',
            price: '$0',
            description: 'For individuals just starting out.',
            features: [
                '5 leads/day',
                'Basic email generation',
                '1 active campaign',
                'Community support'
            ],
            ctaText: 'Choose Plan'
        },
        {
            planName: 'Starter',
            price: '$29',
            description: 'For small teams and freelancers.',
            features: [
                '100 leads/month',
                'AI email generation',
                '5 active campaigns',
                'CRM integration',
                'Email support'
            ],
            ctaText: 'Upgrade to Starter'
        },
        {
            planName: 'Pro',
            price: '$69',
            description: 'For growing businesses and agencies.',
            features: [
                'Unlimited leads',
                'Full CRM functionality',
                'Advanced AI personalization',
                'A/B testing & Analytics',
                'Priority support'
            ],
            isPopular: true,
            ctaText: 'Upgrade to Pro'
        },
        {
            planName: 'Agency',
            price: '$149',
            description: 'For large-scale operations.',
            features: [
                'Everything in Pro',
                'Team access (up to 5 seats)',
                'White-label options',
                'API access',
                'Dedicated account manager'
            ],
            ctaText: 'Upgrade to Agency'
        }
    ];

    const handleCtaClick = (plan: Plan) => {
        if (plan.planName === currentPlan) return;
        
        setSelectedPlan(plan);
        // "Free" plan doesn't need a purchase modal, just switch to it.
        if(plan.planName === 'Free'){
            onUpgrade(plan.planName);
            return;
        }
        setCheckoutModalOpen(true);
    };

    const handleConfirmPurchase = () => {
        if (selectedPlan) {
            onUpgrade(selectedPlan.planName);
        }
        setCheckoutModalOpen(false);
        setSelectedPlan(null);
    };

    return (
        <>
            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setCheckoutModalOpen(false)}
                onConfirm={handleConfirmPurchase}
                plan={selectedPlan}
            />
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Billing & Plans</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Choose the plan that's right for your needs. Cancel or downgrade anytime.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                    {plans.map(plan => (
                        <PlanCard 
                            key={plan.planName} 
                            {...plan} 
                            isCurrent={plan.planName === currentPlan}
                            onCtaClick={() => handleCtaClick(plan)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
