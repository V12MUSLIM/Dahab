import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import { DineProvider } from "./Context/DineContext";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";
import { Toaster } from "@/components/ui/sonner";

// EAGER LOAD
import Home from "./pages/Home";

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
const NotFound = lazy(() => import("./pages/404"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/SignUp"));
function App() {
  return (
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
          <DineProvider>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />

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
              </Routes>
            </div>
          </DineProvider>
        </DefaultLayout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
