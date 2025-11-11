// src/components/booking/PaymentFormStripe.jsx
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { 
  CreditCard, Shield, Lock, AlertCircle, CheckCircle2, 
  Banknote, Wallet, DollarSign 
} from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/customComponents/ButtonVarients';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PaymentFormStripe({ 
  bookingData, 
  total, 
  onSubmit, 
  onPrev, 
  loading, 
  error 
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [cardholderName, setCardholderName] = useState('');

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCardError(null);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded');
      return;
    }

    setProcessing(true);

    try {
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: cardholderName || bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
        },
      });

      if (methodError) {
        setCardError(methodError.message);
        setProcessing(false);
        return;
      }

      await onSubmit(paymentMethod);
    } catch (err) {
      setCardError('Payment processing failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="transition-all duration-300 hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-yellow-600" />
            Secure Payment
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Your payment information is secure and encrypted
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          
          {/* Cardholder Name */}
          <div className="space-y-2">
            <Label htmlFor="cardholderName" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-yellow-600" />
              Cardholder Name *
            </Label>
            <Input
              id="cardholderName"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder={bookingData.name || "Name on card"}
              required
              disabled={processing || loading}
            />
          </div>

          {/* Stripe Card Element */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-yellow-600" />
              Card Information *
            </Label>
            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          {/* Error Display */}
          {(cardError || error) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">Payment Error</p>
                <p className="text-sm text-red-600 dark:text-red-400">{cardError || error}</p>
              </div>
            </motion.div>
          )}

          {/* Security Badge */}
          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                PCI DSS Compliant
              </p>
              <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                Processed securely by Stripe. Your card details are never stored on our servers.
              </p>
            </div>
          </div>

          {/* Amount Display */}
          <div className="p-6 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 rounded-lg border border-yellow-600/20">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-muted-foreground">Amount to Charge</span>
              </div>
              <span className="text-4xl font-black text-yellow-600 dark:text-yellow-500">
                ${total}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span>USD • One-time secure charge</span>
            </div>
          </div>

          {/* ========== UPDATED: CARD ICONS WITHOUT BACKGROUND ========== */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-3 flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              We Accept All Major Cards
            </p>
            <div className="flex justify-center items-center gap-4">
              {/* Visa - No Background */}
              <div className="flex items-center gap-2 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
                <svg className="h-6" viewBox="0 0 48 32" fill="none">
                  <path d="M20 11H18L15 21H17.5L18 19H20L20.5 21H23L21 11H20ZM18.5 17L19.5 13L20.5 17H18.5Z" fill="#1434CB"/>
                  <path d="M24 11L22 21H24.5L26.5 11H24Z" fill="#1434CB"/>
                  <path d="M27 11L25 16L24.5 11H22L23.5 21H26L31 11H27Z" fill="#1434CB"/>
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Visa</span>
              </div>
              
              {/* Mastercard - No Background */}
              <div className="flex items-center gap-2 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
                <svg className="h-6 w-10" viewBox="0 0 48 32" fill="none">
                  <circle cx="18" cy="16" r="8" fill="#EB001B"/>
                  <circle cx="30" cy="16" r="8" fill="#F79E1B"/>
                  <path d="M24 10.5C21.5 12.5 21.5 19.5 24 21.5C26.5 19.5 26.5 12.5 24 10.5Z" fill="#FF5F00"/>
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Mastercard</span>
              </div>
              
              {/* American Express - No Background */}
              <div className="flex items-center gap-2 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
                <svg className="h-6" viewBox="0 0 48 32" fill="none">
                  <path d="M14 12H10L12 16L10 20H14L12 16L14 12Z" fill="#006FCF"/>
                  <path d="M22 12H18L20 16L18 20H22L20 16L22 12Z" fill="#006FCF"/>
                  <path d="M30 12H26L28 16L26 20H30L28 16L30 12Z" fill="#006FCF"/>
                  <path d="M38 12H34L36 16L34 20H38L36 16L38 12Z" fill="#006FCF"/>
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Amex</span>
              </div>
            </div>
          </div>
          {/* ========== END UPDATED ICONS ========== */}

          {/* Secure Payment Notice */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              Secure payment powered by Stripe
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <SecondaryButton
              type="button"
              onClick={onPrev}
              disabled={processing || loading}
              className="flex-1"
            >
              ← Back
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              disabled={!stripe || processing || loading}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {processing || loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Pay ${total}
                </>
              )}
            </PrimaryButton>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
