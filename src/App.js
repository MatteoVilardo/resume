import { ThemeProvider } from "./context/ThemeContext";
import { LocaleProvider } from "./context/LocaleContext";
import { Preloader } from "./components/organisms/Preloader";
import { PageLayout } from "./components/templates/PageLayout";
import { HeroSection } from "./components/organisms/HeroSection";
import { ProjectsGrid } from "./components/organisms/ProjectsGrid";
import { ExperienceTimeline } from "./components/organisms/ExperienceTimeline";
import { TechStack } from "./components/organisms/TechStack";
import { ContactSection } from "./components/organisms/ContactSection";
import { SiteFooter } from "./components/organisms/SiteFooter";

export default function App() {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <Preloader />
        <PageLayout>
          <HeroSection />
          <ProjectsGrid />
          <ExperienceTimeline />
          <TechStack />
          <ContactSection />
          <SiteFooter />
        </PageLayout>
      </ThemeProvider>
    </LocaleProvider>
  );
}
