import React, { useState, useEffect } from 'react';
import { Plan } from '../types';
import { PaypalIcon, VisaIcon, MastercardIcon, AmexIcon, SpinnerIcon } from './Icons';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: Plan | null;
}

type PaymentMethod = 'credit-card' | 'paypal';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onConfirm, plan }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === 'fullName' || name === 'cardName') {
        value = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'cardNumber') {
        const digitsOnly = value.replace(/\D/g, '');
        value = digitsOnly.substring(0, 19).replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'cardExpiry') {
        let currentVal = value.replace(/\D/g, '');
        if (currentVal.length > 2) {
            value = `${currentVal.slice(0, 2)} / ${currentVal.slice(2, 4)}`;
        } else {
            value = currentVal;
        }
    } else if (name === 'cardCvc') {
        value = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setFormData(prev => ({...prev, [name]: value}));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Reset state when modal opens or plan changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsProcessing(false);
      setPaymentMethod('credit-card');
      setErrors({});
      setFormData({
        fullName: '',
        email: '',
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
      });
    }
  }, [isOpen]);


  if (!isOpen || !plan) return null;

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
        newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email address is invalid.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (paymentMethod === 'credit-card') {
        if (!formData.cardName.trim()) newErrors.cardName = 'Name on Card is required.';
        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'Card Number is required.';
        } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = 'Invalid Card Number format.';
        }
        if (!formData.cardExpiry.trim()) {
            newErrors.cardExpiry = 'Expiry Date is required.';
        } else if (!/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/.test(formData.cardExpiry)) {
             newErrors.cardExpiry = 'Invalid format. Use MM / YY.';
        } else {
            const [month, year] = formData.cardExpiry.split(' / ');
            const expiryDate = new Date(parseInt(`20${year}`), parseInt(month), 0); // Day 0 of next month is last day of current
            if (expiryDate < new Date()) {
                newErrors.cardExpiry = 'Card has expired.';
            }
        }
        if (!formData.cardCvc.trim()) {
            newErrors.cardCvc = 'CVC is required.';
        } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
            newErrors.cardCvc = 'Invalid CVC.';
        }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
        setStep(2);
    } else if (step === 2 && validateStep2()) {
        setStep(3);
    }
  };
  const handleBack = () => setStep(s => s - 1);
  
  const handleFinalConfirm = () => {
      setIsProcessing(true);
      // Simulate API call
      setTimeout(() => {
          setIsProcessing(false);
          onConfirm();
      }, 1500);
  }

  const handleProceedWithPayPal = () => {
    setIsProcessing(true);
    // Simulate backend interaction and redirect
    setTimeout(() => {
        onConfirm();
        window.location.href = 'https://www.paypal.com/checkoutnow?token=YOUR_SUBSCRIPTION_TOKEN';
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Personal Info
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Step 1: Your Information</h3>
            <div className="space-y-4">
              <div>
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
                {errors.fullName && <p className="text-red-500 text-xs mt-1 px-1">{errors.fullName}</p>}
              </div>
              <div>
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
                {errors.email && <p className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>}
              </div>
            </div>
          </div>
        );
      case 2: // Payment Details
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Step 2: Payment Details</h3>
            <div className="flex space-x-2 rounded-lg bg-gray-100 dark:bg-brand-surface p-1 mb-6">
                <button onClick={() => setPaymentMethod('credit-card')} className={`flex-1 p-2 rounded-md text-sm font-medium transition-colors ${paymentMethod === 'credit-card' ? 'bg-brand-primary text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10'}`}>Credit Card</button>
                <button onClick={() => setPaymentMethod('paypal')} className={`flex-1 p-2 rounded-md text-sm font-medium transition-colors ${paymentMethod === 'paypal' ? 'bg-brand-primary text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10'}`}>PayPal</button>
            </div>
            {paymentMethod === 'credit-card' ? (
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center space-x-4 bg-gray-100 dark:bg-brand-surface p-3 rounded-lg">
                            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="flex-1 bg-transparent text-gray-900 dark:text-white focus:outline-none" />
                            <div className="flex items-center space-x-1">
                                <VisaIcon className="h-6 w-auto" />
                                <MastercardIcon className="h-6 w-auto" />
                                <AmexIcon className="h-6 w-auto" />
                            </div>
                        </div>
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1 px-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                        <input type="text" name="cardName" placeholder="Name on Card" value={formData.cardName} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1 px-1">{errors.cardName}</p>}
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <input type="text" name="cardExpiry" placeholder="MM / YY" value={formData.cardExpiry} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
                            {errors.cardExpiry && <p className="text-red-500 text-xs mt-1 px-1">{errors.cardExpiry}</p>}
                        </div>
                        <div className="w-1/2">
                            <input type="text" name="cardCvc" placeholder="CVC" value={formData.cardCvc} onChange={handleInputChange} className="w-full bg-gray-100 dark:bg-brand-surface p-3 rounded-lg text-gray-900 dark:text-white border-2 border-transparent focus:border-brand-primary focus:outline-none" />
                            {errors.cardCvc && <p className="text-red-500 text-xs mt-1 px-1">{errors.cardCvc}</p>}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center p-8 border-2 border-dashed border-gray-300 dark:border-brand-stroke/30 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                    <button onClick={handleProceedWithPayPal} disabled={isProcessing} className="bg-[#0070BA] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center w-full hover:opacity-90 disabled:opacity-70">
                        {isProcessing ? <SpinnerIcon className="animate-spin h-5 w-5"/> : (
                           <>
                            <PaypalIcon className="w-5 h-5 mr-2" />
                            Proceed with PayPal
                           </>
                        )}
                    </button>
                </div>
            )}
          </div>
        );
      case 3: // Confirmation
        return (
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Step 3: Confirm Purchase</h3>
                <div className="bg-gray-100 dark:bg-brand-surface p-6 rounded-lg space-y-3">
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                        <span>Plan:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{plan.planName}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                        <span>Billed:</span>
                        <span className="font-bold text-gray-900 dark:text-white">Monthly</span>
                    </div>
                     <div className="border-t border-gray-200 dark:border-brand-stroke/20 my-3"></div>
                    <div className="flex justify-between items-center text-gray-900 dark:text-white text-lg">
                        <span className="font-semibold">Total Due Today:</span>
                        <span className="font-bold">{plan.price}</span>
                    </div>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-brand-bg rounded-xl border border-gray-200 dark:border-brand-stroke/30 w-full max-w-lg p-8 m-4">
        <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upgrade to {plan.planName}</h2>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Step {step} of 3</span>
        </div>
        
        <div className="min-h-[250px]">
            {renderStep()}
        </div>

        <div className="flex justify-between items-center mt-8">
            <div>
                {step > 1 && !isProcessing && (
                    <button onClick={handleBack} className="py-2 px-6 bg-gray-200 dark:bg-brand-surface rounded-lg text-gray-900 dark:text-white hover:opacity-80">
                        Back
                    </button>
                )}
            </div>
            <div>
                <button onClick={onClose} className="py-2 px-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mr-2">Cancel</button>
                {step < 3 && !(step === 2 && paymentMethod === 'paypal') && (
                    <button onClick={handleNext} className="py-2 px-6 bg-brand-primary rounded-lg text-black font-bold hover:opacity-90">
                        Next
                    </button>
                )}
                {step === 3 && (
                    <button onClick={handleFinalConfirm} disabled={isProcessing} className="py-2 px-6 bg-brand-primary rounded-lg text-black font-bold hover:opacity-90 flex items-center justify-center min-w-[160px]">
                       {isProcessing ? <SpinnerIcon className="animate-spin h-5 w-5"/> : 'Confirm Purchase'}
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};