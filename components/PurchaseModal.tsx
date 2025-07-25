
import React from 'react';
import { PlanName } from '../types';

interface Plan {
    planName: PlanName;
    price: string;
}
interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: Plan | null;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, onConfirm, plan }) => {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-brand-bg rounded-xl border border-brand-stroke/30 w-full max-w-md p-8 m-4">
        <h2 className="text-2xl font-bold text-white mb-4">Confirm Upgrade</h2>
        <p className="text-gray-300 mb-6">
          You are about to upgrade to the <span className="font-bold text-white">{plan.planName}</span> plan for <span className="font-bold text-white">{plan.price}/month</span>.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Your account will be billed immediately and your new features will be unlocked.
        </p>
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="py-2 px-6 bg-brand-surface rounded-lg text-white hover:opacity-80">
            Cancel
          </button>
          <button onClick={onConfirm} className="py-2 px-6 bg-brand-primary rounded-lg text-black font-bold hover:opacity-90">
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};
