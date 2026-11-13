// import { Routes, Route } from 'react-router-dom'


import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/AnimatedBackground";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Skills from "./Pages/Skills";
import Projects from "./Pages/project";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";

import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
    <Navbar />

<main className="app-content">
  <section id="home"><Home /></section>
  <section id="about"><About /></section>
  <section id="skills"><Skills /></section>
  <section id="projects"><Projects /></section>
  <section id="blog"><Blog /></section>
  <section id="contact"><Contact /></section>
</main>
      <Footer />
      <AnimatedBackground />
    </>
  );
}

export default App;
