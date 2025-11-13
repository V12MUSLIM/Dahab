// src/components/booking/Payment.jsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck } from "lucide-react";
import PaymentFormStripe from "@/components/booking/PaymentFormStripe";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Payment({
  bookingData,
  total,
  handleSubmitBooking,
  handlePrev,
  loading,
  paymentError,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex justify-center py-10 px-4 sm:px-8"
    >
      <Card className="w-full max-w-2xl border border-gray-200 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden">
        {/* ===== HEADER ===== */}
        <CardHeader className="text-yellow-600 dark:text-yellow-500 py-6">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold tracking-tight ">
            <CreditCard className="w-6 h-6" />
            Payment Details
          </CardTitle>
        </CardHeader>

        {/* ===== CONTENT ===== */}
        <CardContent className="p-6 space-y-6">
          {/* Payment Error */}
          {paymentError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
            >
              {paymentError}
            </motion.div>
          )}

          {/* Stripe Payment Form */}
          <Elements stripe={stripePromise}>
            <PaymentFormStripe
              bookingData={bookingData}
              total={total}
              onSubmit={handleSubmitBooking}
              onPrev={handlePrev}
              loading={loading}
              error={paymentError}
            />
          </Elements>

          {/* Security Info */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Payments are securely processed by Stripe</span>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
