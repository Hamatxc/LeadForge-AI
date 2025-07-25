
import React from 'react';

interface ContactSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSalesModal: React.FC<ContactSalesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-brand-bg rounded-xl border border-brand-stroke/30 w-full max-w-md p-8 m-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Contact Sales</h2>
        <p className="text-gray-300 mb-6">
          To discuss the Agency plan and get a personalized quote, please reach out to our sales team.
        </p>
        <div className="bg-brand-surface p-4 rounded-lg">
            <p className="text-gray-400">Email us at:</p>
            <a href="mailto:sales@leadforge.ai" className="text-brand-primary font-bold text-lg hover:underline">sales@leadforge.ai</a>
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={onClose} className="py-2 px-6 bg-brand-primary rounded-lg text-black font-bold hover:opacity-90">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
