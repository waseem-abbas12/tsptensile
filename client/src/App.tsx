/* Style reminder: Desert Modernism — the app shell stays light, editorial and image-led; no black/orange default theme. */
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ContentProvider } from "./contexts/ContentContext";
import { Layout } from "./components/Layout";

// Lazy load all pages — each becomes its own JS chunk (faster first load on mobile)
const Home = lazy(() => import("./pages/Home"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const SolutionsPage = lazy(() => import("./pages/Solutions"));
const ProcessPage = lazy(() => import("./pages/Process"));
const EngineeringPage = lazy(() => import("./pages/Engineering"));
const AboutPage = lazy(() => import("./pages/About"));
const CeoPage = lazy(() => import("./pages/CEO"));
const LocationsPage = lazy(() => import("./pages/Locations"));
const LocationCityPage = lazy(() => import("./pages/LocationCity"));
const FaqPage = lazy(() => import("./pages/FAQ"));
const ContactPage = lazy(() => import("./pages/Contact"));
const AdminPage = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ContentProvider>
          <TooltipProvider>
            <Toaster />
            <Suspense fallback={
              <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F2EA" }}>
                <div style={{ width: 40, height: 40, border: "3px solid #D9DED8", borderTopColor: "#2D6A68", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            }>
              <Switch>
                <Route path="/admin" component={AdminPage} />
                <Route path="/admin/" component={AdminPage} />
                <Route path="/admin/:sub*" component={AdminPage} />
                <Route path="/Admin" component={AdminPage} />
                <Route path="/Admin/" component={AdminPage} />
                <Route path="/Admin/:sub*" component={AdminPage} />
                <Route>
                  <Layout>
                    <Switch>
                      <Route path="/" component={Home} />
                      <Route path="/projects" component={ProjectsPage} />
                      <Route path="/solutions" component={SolutionsPage} />
                      <Route path="/locations" component={LocationsPage} />
                      <Route path="/locations/:city" component={LocationCityPage} />
                      {/* High Intent City Keyword Aliases */}
                      <Route path="/car-parking-shades-lahore">{() => <LocationCityPage city="lahore" />}</Route>
                      <Route path="/car-parking-shades-islamabad">{() => <LocationCityPage city="islamabad" />}</Route>
                      <Route path="/car-parking-shades-rawalpindi">{() => <LocationCityPage city="rawalpindi" />}</Route>
                      <Route path="/car-parking-shades-karachi">{() => <LocationCityPage city="karachi" />}</Route>
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
            </Suspense>
          </TooltipProvider>
        </ContentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
