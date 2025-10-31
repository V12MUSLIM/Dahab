import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import { ExperienceProvider } from "./Context/ExperiencesContext";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";
import { Toaster } from "@/components/ui/sonner";
import AuthCallback from "./pages/AuthCallback";
import { useAuthStore } from "./store/authStore";
import { Spinner } from "@/components/ui/spinner";
import { useSyncUserToQuery } from "@/hooks/useSyncUserToQuery";
// EAGER LOAD
import Home from "./pages/Home";
import Settings from "./pages/ProfileSettings";
// LAZY LOAD
const Stay = lazy(() => import("./pages/Stay"));
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

// Auth initialization component
const AuthInitializer = ({ children }) => {
  const { checkAuthStatus, isLoading } = useAuthStore();

  useEffect(() => {
    // Check auth status on app load
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Show spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center space-y-4">
          <Spinner className="w-8 h-8 mx-auto" />
          <p className="text-muted-foreground">Thinking...</p>
        </div>
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
        <DefaultLayout>
          <ExperienceProvider>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />

                  {/* Dashboard Routes */}
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
                    path="/stay"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Stay />
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
                    path="*"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <NotFound />
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
                  <Route path="/auth/callback" element={<AuthCallback />} />
                </Routes>
              </div>
            </ExperienceProvider>
          </DefaultLayout>
        </HashRouter>
      </ThemeProvider>
    </AuthInitializer>
  );
}

export default App;
