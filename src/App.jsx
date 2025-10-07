import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Stay from "./pages/Stay";
import Dine from "./pages/Dine";
import Home from "./pages/Home";
import PlantTrip from "./pages/PlanTrip";
import Destinations from "./pages/Destinations";
import Experiences from "./pages/Experiences";
import ExperiencesDetail from "./components/sections/ExperincesDetailsSections";
import DefaultLayout from "./layouts/DefaultLayout";
import DestinationDetail from "./components/sections/DestinationsDetailsSections";
import { DestinationsProvider } from "./Context/DestinationsContext";
import { ThemeProvider } from "./components/theme-provider";
import NotFound from "./pages/404";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HashRouter>
        <DefaultLayout>
          <DestinationsProvider>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stay" element={<Stay />} />
                <Route path="/dine" element={<Dine />} />
                <Route path="/plantrip" element={<PlantTrip />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route
                  path="/destinations/:IdPage"
                  element={<DestinationDetail />}
                />
                <Route path="/experiences" element={<Experiences />} />
                <Route
                  path="/experiences/:IdPage"
                  element={<ExperiencesDetail />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </DestinationsProvider>
        </DefaultLayout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
