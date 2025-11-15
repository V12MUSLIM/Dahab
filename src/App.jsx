import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { ExperienceProvider } from "./Context/ExperiencesContext";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";
import { Toaster } from "@/components/ui/sonner";
import AuthCallback from "./pages/AuthCallback";
import { useAuthStore } from "./store/authStore";
import Loading from "@/components/Loading";
import { useSyncUserToQuery } from "@/hooks/useSyncUserToQuery";
import Forbidden from "./pages/403";
import AdminEditContact from "./pages/dashboard/EditContact";
// EAGER LOAD
import Home from "./pages/Home";

// LAZY LOAD
const Stay = lazy(() => import("./pages/Stay"));
const StayDetails = lazy(() => import("./components/sections/StayDetails")); // Add this
const Dine = lazy(() => import("./pages/Dine"));
const PlanTrip = lazy(() => import("./pages/PlanTrip"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Experiences = lazy(() => import("./pages/Experiences"));
const ExperiencesDetail = lazy(() =>
  import("./components/sections/ExperincesDetailsSections")
);
const DestinationDetail = lazy(() =>
  import("./components/sections/DestinationsDetailsSections")
);
const DineDetails = lazy(() => import("./components/sections/DineDetails"));
const NotFound = lazy(() => import("./pages/404"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const DashboardDestinations = lazy(() =>
  import("./pages/dashboard/DashboardDestinations")
);
const Booking = lazy(() => import("./pages/Booking"));
const Settings = lazy(() => import("./pages/ProfileSettings"));

// --- Auth initialization ---
const AuthInitializer = ({ children }) => {
  const { checkAuthStatus, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuthStatus(); // check user auth state once app loads
  }, [checkAuthStatus]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loading loadingMessage="Please wait..." />
      </div>
    );
  }

  return children;
};

function App() {
  useSyncUserToQuery();

  return (
    <AuthInitializer>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <HashRouter>
          <ScrollToTop />
          <Toaster />
          <ExperienceProvider>
            <div className="App">
              <Routes>
                {/* Public Routes - wrapped in DefaultLayout */}
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/stay"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Stay />
                      </Suspense>
                    }
                  />
                  {/* Add Stay Details Route */}
                  <Route
                    path="/stay/:id"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <StayDetails />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/dine"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Dine />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/plantrip"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <PlanTrip />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/destinations"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Destinations />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/destinations/:IdPage"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <DestinationDetail />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/restaurants/:IdPage"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <DineDetails />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/cafes/:IdPage"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <DineDetails />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/experiences"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Experiences />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/experiences/:IdPage"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <ExperiencesDetail />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/booking"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Booking />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <LoginPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <SignupPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <NotFound />
                      </Suspense>
                    }
                  />
                </Route>

                <Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
                  <Route
                    path="/dashboard"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/dashboard/destinations"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <DashboardDestinations />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/dashboard/contacts"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <AdminEditContact />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="/403"
                  element={
                    <Suspense fallback={<PageSkeleton />}>
                      <Forbidden />
                    </Suspense>
                  }
                />

                {/* User or Admin can access Settings */}
                <Route
                  element={<ProtectedLayout allowedRoles={["user", "admin"]} />}
                >
                  <Route
                    path="/settings"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Settings />
                      </Suspense>
                    }
                  />
                </Route>

                {/* OAuth callback - no layout */}
                <Route path="/auth/callback" element={<AuthCallback />} />
              </Routes>
            </div>
          </ExperienceProvider>
        </HashRouter>
      </ThemeProvider>
    </AuthInitializer>
  );
}

export default App;
{/* Testing  */}