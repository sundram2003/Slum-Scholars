
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p>&copy; {new Date().getFullYear()} Slum Scholar. All rights reserved.</p>
        <div style={linksStyle}>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div style={socialIconsStyle}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook style={iconStyle} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter style={iconStyle} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram style={iconStyle} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={iconStyle} />
          </a>
        </div>
      </div>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px 0',
  position: 'relative',
  bottom: '0',
  width: '100%',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '80%',
  margin: '0 auto',
  flexDirection: 'column', // Align items in a column
};

const linksStyle: React.CSSProperties = {
  display: 'flex',
  gap: '15px',
  marginBottom: '15px',
};

const socialIconsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '15px',
};

const iconStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#fff',
  transition: 'color 0.3s',
};

export default Footer;
