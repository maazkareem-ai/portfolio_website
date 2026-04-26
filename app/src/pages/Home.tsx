import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Research from "@/sections/Research";
import Skills from "@/sections/Skills";
import Certifications from "@/sections/Certifications";
import Achievements from "@/sections/Achievements";
import Documents from "@/sections/Documents";
import GitHubRepos from "@/components/GitHubRepos";
import Contact from "@/sections/Contact";
import AIChatbot from "@/components/AIChatbot";
import CursorSpotlight from "@/components/CursorSpotlight";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Research />
        <Skills />
        <GitHubRepos />
        <Certifications />
        <Achievements />
        <Documents />
        <Contact />
      </main>
      
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-muted-foreground/50 text-sm">
              &copy; {new Date().getFullYear()} Maaz Kareem. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="https://github.com/maazkareem-ai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/40 hover:text-muted-foreground transition-colors text-sm">GitHub</a>
              <a href="https://www.linkedin.com/in/maazkareem-ai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/40 hover:text-muted-foreground transition-colors text-sm">LinkedIn</a>
              <a href="https://www.kaggle.com/maazkareem" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/40 hover:text-muted-foreground transition-colors text-sm">Kaggle</a>
            </div>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  );
}
