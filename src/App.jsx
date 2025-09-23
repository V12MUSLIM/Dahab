import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom"; // Remove BrowserRouter, keep only HashRouter
import Home from "./pages/Home";
import Stay from "./pages/Stay";
import Dine from "./pages/Dine";
import PlantTrip from "./pages/PlanTrip";
import DefaultLayout from "./layouts/DefaultLayout";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HashRouter> {/* Change from BrowserRouter to HashRouter */}
        <DefaultLayout>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/dine" element={<Dine />} />
              <Route path="/plantrip" element={<PlantTrip />} />
            </Routes>
          </div>
        </DefaultLayout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;