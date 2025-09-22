import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <BrowserRouter>
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;