import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom"; 
import Stay from "./pages/Stay";
import Dine from "./pages/Dine";
import Home from "./pages/Home";
import PlantTrip from "./pages/PlanTrip";
import Destinations from "./pages/Destinations";
import Experiences from "./pages/Experiences";
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
      <HashRouter> 
        <DefaultLayout>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/dine" element={<Dine />} />
              <Route path="/plantrip" element={<PlantTrip />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/experiences" element={<Experiences />} />
            </Routes>
          </div>
        </DefaultLayout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;