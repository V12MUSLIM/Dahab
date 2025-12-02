import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowLeft, Calendar, Users, Mail, Phone } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/customComponents/ButtonVarients';
import { Card, CardContent } from '@/components/ui/card';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { total, booking } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        <Card className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl mb-6">
          <CardContent className="p-8">
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Thank you for your booking. We've sent a confirmation email.
              </p>
            </div>

            <div className="border-t border-b border-gray-200 dark:border-zinc-700 py-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Booking ID</p>
                  <p className="font-mono font-semibold text-gray-900 dark:text-white break-all">
                    #{bookingId?.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                    ${total || 0}
                  </p>
                </div>
              </div>
            </div>

            {booking && (
              <div className="space-y-6 mb-6">
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                    Trip Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {new Date(booking.tripDetails?.checkIn).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Check-out:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {new Date(booking.tripDetails?.checkOut).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                      <span className="text-gray-600 dark:text-gray-400">Adults:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {booking.tripDetails?.adults}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                      <span className="text-gray-600 dark:text-gray-400">Children:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {booking.tripDetails?.children}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {booking.userInfo?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      {booking.userInfo?.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      {booking.userInfo?.phone}
                    </div>
                  </div>
                </div>

                {booking.userInfo?.specialRequests && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Special Requests
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg">
                      {booking.userInfo.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <SecondaryButton 
                onClick={() => navigate('/')}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </SecondaryButton>
              <PrimaryButton 
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Print Confirmation
              </PrimaryButton>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Questions? Contact us at <a href="mailto:support@dahab.com" className="text-amber-600 dark:text-amber-500 hover:underline">support@dahab.com</a></p>
        </div>
      </div>
    </div>
  );
}
