import { Routes, Route } from "react-router-dom";

import Navbar from "./sections/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Footer from "./sections/Footer";

// admin
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import LoginPage from "./admin/Login";
import Message from "./admin/Message";
import AdminProjects from "./admin/Projects";
import AdminExperience from "./admin/Experience";
import AdminSkills from "./admin/Skills";
import AdminResume from "./admin/Resume";
import AdminSettings from "./admin/Settings";
import AdminEducation from "./admin/Education";
import ProtectedRoute from "./admin/ProtectedRoute";
import Skills from "./pages/Skills";
import ChatButton from "./components/chat/ChatButton";
import Chat from "./admin/pages/Chat";


export default function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={
        <div>
          <Navbar />
          < About />
          <Footer />
        </div>
      } />
      <Route path="/projects" element={
        <div>
          <Navbar />
          <Projects />
          <Footer />
        </div>
      } />
      <Route path="/projects/:id" element={
         <div>
          <Navbar />
          <ProjectDetails />
          <Footer />
        </div>
        } />
      <Route path="/services" element={
         <div>
          <Navbar />
          <Services />
          <Footer />
        </div>
        } />
      <Route path="/contact" element={
        <div>
          <Navbar />
          <Contact />
          <Footer />
        </div>
      } />
      <Route path="/resume" element={
        <div>
          <Navbar />
          <Resume />
          <Footer />
        </div>
      } />
      <Route path="/skill" element={
         <div>
          <Navbar />
          <Skills />
          <Footer />
        </div>
        } />

      {/* admin Route */}
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="skills" element={<AdminSkills />} />
        <Route path="experience" element={<AdminExperience />} />
        <Route path="education" element={<AdminEducation />} />
        <Route path="resume" element={<AdminResume />} />
        <Route path="messages" element={<Message />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>

      <ChatButton />

    </>
   

  );
}
