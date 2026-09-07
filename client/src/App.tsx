/* Style reminder: Desert Modernism — the app shell stays light, editorial and image-led; no black/orange default theme. */
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ContentProvider } from "./contexts/ContentContext";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import SolutionsPage from "./pages/Solutions";
import ProcessPage from "./pages/Process";
import EngineeringPage from "./pages/Engineering";
import AboutPage from "./pages/About";
import CeoPage from "./pages/CEO";
import FaqPage from "./pages/FAQ";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ContentProvider>
          <TooltipProvider>
            <Toaster />
            <Switch>
              <Route path="/admin" component={AdminPage} />
              <Route>
                <Layout>
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/projects" component={ProjectsPage} />
                    <Route path="/solutions" component={SolutionsPage} />
                    <Route path="/process" component={ProcessPage} />
                    <Route path="/engineering" component={EngineeringPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/about/ceo" component={CeoPage} />
                    <Route path="/faq" component={FaqPage} />
                    <Route path="/contact" component={ContactPage} />
                    <Route component={NotFound} />
                  </Switch>
                </Layout>
              </Route>
            </Switch>
          </TooltipProvider>
        </ContentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
