import CapabilitiesSection from "./components/CapabilitiesSection/CapabilitiesSection";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroSection/>
      <CapabilitiesSection/>
      <ProjectsSection/>
    </main>
  );
}
