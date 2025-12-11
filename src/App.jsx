import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense} from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { ExperienceProvider } from "./Context/ExperiencesContext";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";
import { Toaster } from "@/components/ui/sonner";
import AuthCallback from "./pages/AuthCallback";

import { useSyncUserToQuery } from "@/hooks/useSyncUserToQuery";
import Forbidden from "./pages/403";
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
// EAGER LOAD
import Home from "./pages/Home";
import DashboardRoutes from "./pages/dashboard/Dashboardroutes";
// LAZY LOAD
// const Forbidden= lazy(() => import("./pages/403"));
const Stay = lazy(() => import("./pages/stay/Stay"));
const StayDetails = lazy(() => import("./pages/stay/StayDetails")); // Add this
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
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";

const Booking = lazy(() => import("./pages/Booking"));
const Settings = lazy(() => import("./pages/ProfileSettings"));

import GuestRoute from "./layouts/GuestRoute";
import AuthInitializer from "./lib/AuthIntializer";

function App() {
  useSyncUserToQuery();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HashRouter>
        <Toaster />
        <AuthInitializer>
          <ScrollToTop />

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
                  <Route element={<GuestRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                  </Route>

                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <NotFound />
                      </Suspense>
                    }
                  />
                </Route>
                {/* ADMIN DASHBOARD */}
                <Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
                  <Route path="/dashboard/*" element={<DashboardLayout />}>
                    <Route
                      path="*"
                      element={
                        <Suspense fallback={<PageSkeleton />}>
                          <DashboardRoutes />
                        </Suspense>
                      }
                    />
                  </Route>
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
                <Route element={<DefaultLayout />}>
                  <Route
                    element={
                      <ProtectedLayout allowedRoles={["user", "admin"]} />
                    }
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
                </Route>

                {/* OAuth callback - no layout */}
                <Route path="/auth/callback" element={<AuthCallback />} />
              </Routes>
            </div>
          </ExperienceProvider>
        </AuthInitializer>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
