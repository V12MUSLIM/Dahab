
import PaymentFormStripe from "@/components/booking/PaymentFormStripe";

export default function Payment({ bookingData, total, handleSubmitBooking, handlePrev, loading, paymentError }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      {paymentError && <p className="text-red-600">{paymentError}</p>}
      <PaymentFormStripe
        bookingData={bookingData}
        total={total}
        onSubmit={handleSubmitBooking}
        onPrev={handlePrev}
        loading={loading}
        error={paymentError}
      />
    </div>
  );
}
