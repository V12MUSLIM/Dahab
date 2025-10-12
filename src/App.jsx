import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; // ADD THIS
import DefaultLayout from "./layouts/DefaultLayout";
import { DestinationsProvider } from "./context/DestinationsContext";
import { DineProvider } from "./Context/DineContext";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton"; // Your loading component

// EAGER LOAD: Only Home page (critical for first paint)
import Home from "./pages/Home";

// LAZY LOAD: Everything else
const Stay = lazy(() => import("./pages/Stay"));
const Dine = lazy(() => import("./pages/Dine"));
const PlanTrip = lazy(() => import("./pages/PlanTrip"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Experiences = lazy(() => import("./pages/Experiences"));
const ExperiencesDetail = lazy(() => import("./components/sections/ExperincesDetailsSections"));
const DestinationDetail = lazy(() => import("./components/sections/DestinationsDetailsSections"));
const NotFound = lazy(() => import("./pages/404"));

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
        <DefaultLayout>
          <DestinationsProvider>
            <DineProvider>
              <div className="App">
                <Routes>
                  {/* Home loads immediately */}
                  <Route path="/" element={<Home />} />
                  
                  {/* All other routes lazy load */}
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
                </Routes>
              </div>
            </DineProvider>
          </DestinationsProvider>
        </DefaultLayout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;