import "./App.css";
import Home from "./pages/Home";
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
      <DefaultLayout />
      <Home />
    </ThemeProvider>
  );
}

export default App;