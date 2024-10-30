import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Impact from './components/Impact';
import GetInvolved from './components/GetInvolved';
import Contact from './components/Contact';
import Admin from './components/ui/Admin';
import DonatePage from './components/DonatePage';
import Posts from './components/Posts'; 
import PostDetail from './components/PostDetail'; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Homepage = () => {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Impact />
      <GetInvolved />
      <Contact />
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Slum Scholar. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook className="text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-2xl hover:text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <header>
          <Navbar />
        </header>

        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<div className="pt-16"><Homepage /></div>} 
            />
            <Route 
              path="/admin" 
              element={<div className="pt-16 pb-8"><Admin /></div>} 
            />
            <Route 
              path="/donate" 
              element={<div className="pt-16 pb-8"><DonatePage /></div>}
            />
            <Route path="/posts" element={<Posts />} /> 
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;