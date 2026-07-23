import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { HowItWorks } from './components/HowItWorks';
import { DeveloperSection } from './components/DeveloperSection';
import { UseCases } from './components/UseCases';
import { OpenSource } from './components/OpenSource';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export function App() {
  const [triggerVerify, setTriggerVerify] = useState(0);

  const handleTryDemo = useCallback(() => {
    setTriggerVerify((n) => n + 1);
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main>
        <Hero onTryDemo={handleTryDemo} triggerVerify={triggerVerify} />
        <Problem />
        <HowItWorks />
        <DeveloperSection />
        <UseCases />
        <OpenSource />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
