import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  CreditCard,
  Shield,
  Lock,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Wallet,
  Globe,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/customComponents/ButtonVarients";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentFormStripe({
  bookingData,
  total,
  onSubmit,
  onPrev,
  loading,
  error,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [cardholderName, setCardholderName] = useState("");
  const [country, setCountry] = useState("EG");
  const [cardBrand, setCardBrand] = useState(null);

  const ELEMENT_STYLE = {
    base: {
      color: "#1f2937",
      fontFamily: "Inter, Roboto, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#9ca3af" },
      iconColor: "#d97706",
    },
    invalid: { color: "#ef4444", iconColor: "#ef4444" },
  };

  const ELEMENT_STYLE_DARK = {
    base: {
      color: "#f1f1f1",
      fontFamily: "Inter, Roboto, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#9ca3af" },
      iconColor: "#f59e0b",
    },
    invalid: { color: "#ef4444", iconColor: "#ef4444" },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCardError(null);
    setProcessing(true);

    try {
      if (!stripe || !elements) {
        setCardError("Stripe has not loaded yet. Please try again.");
        setProcessing(false);
        return;
      }

      if (!cardholderName.trim()) {
        setCardError("Please enter the cardholder name");
        setProcessing(false);
        return;
      }

      const cardElement = elements.getElement(CardNumberElement);
      
      if (!cardElement) {
        setCardError("Card element not found");
        setProcessing(false);
        return;
      }

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: cardholderName,
          email: bookingData.email,
          phone: bookingData.phone,
          address: {
            country: country,
          },
        },
      });

      if (pmError) {
        setCardError(pmError.message || "Failed to process card details");
        setProcessing(false);
        return;
      }

      await onSubmit(paymentMethod);
      
    } catch (err) {
      console.error("Payment error:", err);
      setCardError(err.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }

    if (event.brand && event.brand !== cardBrand) {
      setCardBrand(event.brand);
    }
  };

  const getCardLogo = () => {
    switch (cardBrand) {
      case "visa":
        return "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg";
      case "mastercard":
        return "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg";
      case "amex":
        return "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg";
      case "discover":
        return "https://upload.wikimedia.org/wikipedia/commons/5/50/Discover_Card_logo.svg";
      default:
        return null;
    }
  };

  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Card className="border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden">
        <CardContent className="p-6 space-y-6">

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-500 mb-2">
              <Wallet className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Secure Payment</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your card details are encrypted and securely processed by Stripe
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CreditCard className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              Card Name
            </Label>
            <Input
              id="cardholderName"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder={bookingData.name || "Name on card"}
              required
              disabled={processing || loading}
              className="h-11 bg-gray-50 dark:bg-zinc-800 
                         border-gray-300 dark:border-zinc-700 
                         text-gray-900 dark:text-gray-200 
                         placeholder-gray-500 dark:placeholder-gray-500 
                         focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-2 relative">
            <Label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Lock className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              Card Number
            </Label>

            <div className="stripe-field">
              <CardNumberElement
                options={{ style: isDarkMode ? ELEMENT_STYLE_DARK : ELEMENT_STYLE }}
                onChange={handleCardChange}
              />
              {getCardLogo() && (
                <img
                  src={getCardLogo()}
                  alt="Card Type"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-auto"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-700 dark:text-gray-300">Expiration Date</Label>
              <div className="stripe-field">
                <CardExpiryElement 
                  options={{ style: isDarkMode ? ELEMENT_STYLE_DARK : ELEMENT_STYLE }}
                  onChange={(e) => e.error && setCardError(e.error.message)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-700 dark:text-gray-300">Security Code (CVC)</Label>
              <div className="stripe-field">
                <CardCvcElement 
                  options={{ style: isDarkMode ? ELEMENT_STYLE_DARK : ELEMENT_STYLE }}
                  onChange={(e) => e.error && setCardError(e.error.message)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Globe className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              Country
            </Label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={processing || loading}
              className="w-full h-11 
                         bg-gray-50 dark:bg-zinc-800 
                         border border-gray-300 dark:border-zinc-700 
                         text-gray-900 dark:text-gray-200 
                         rounded-lg px-3 
                         focus:ring-amber-500 focus:border-amber-500
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="EG">Egypt</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="AE">UAE</option>
              <option value="SA">Saudi Arabia</option>
            </select>
          </div>

          {(cardError || error) && (
            <div
              className="flex items-start gap-3 p-4 
                         bg-red-50 dark:bg-red-900/20 
                         border border-red-200 dark:border-red-800 
                         rounded-lg animate-shake"
            >
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                {cardError || error}
              </p>
            </div>
          )}

          <div className="p-5 
                          bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 
                          border border-amber-200 dark:border-amber-700/30 
                          rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Amount</span>
              </div>
              <span className="text-3xl font-bold text-amber-700 dark:text-amber-500">${total}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-2">
              <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-500" />
              <span>USD • One-time charge</span>
            </div>
          </div>

          <div className="flex items-center justify-center pt-2 border-t border-gray-200 dark:border-zinc-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-500" />
              Powered by <span className="font-semibold text-gray-800 dark:text-gray-200">Stripe</span>
            </p>
          </div>

          <div className="flex gap-3 pt-3">
            <SecondaryButton
              type="button"
              onClick={onPrev}
              disabled={processing || loading}
              className="flex-1 h-11"
            >
              ← Back
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              disabled={!stripe || processing || loading || !cardholderName.trim()}
              className="flex-1 flex items-center justify-center gap-2 h-11"
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
