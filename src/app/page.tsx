'use client'
import { Provider } from "react-redux";
import CapabilitiesSection from "./components/CapabilitiesSection/CapabilitiesSection";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import styles from "./page.module.css";
import { store } from "./components/redux/store";

export default function Home() {
  return (
    <main className={styles.container}>
      <Provider store={store}>
        <Navbar/>
        <HeroSection/>
        <CapabilitiesSection/>
        <ProjectsSection/>
      </Provider>
    </main>
  );
}
