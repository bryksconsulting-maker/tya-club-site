import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Parents from "./pages/Parents";
import Programme from "./pages/Programme";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Curriculum from "./pages/Curriculum";
import ParentGuides from "./pages/ParentGuides";
import Experience from "./pages/Experience";
import Centres from "./pages/Centres";
import Contact from "./pages/Contact";
import Franchise from "./pages/Franchise";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/parents" component={Parents} />
      <Route path="/parent-guides" component={ParentGuides} />
      <Route path="/about" component={About} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/curriculum" component={Curriculum} />
      <Route path="/experience" component={Experience} />
      <Route path="/centres" component={Centres} />
      <Route path="/contact" component={Contact} />
      <Route path="/franchise" component={Franchise} />
      <Route path="/programmes/:slug" component={Programme} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
