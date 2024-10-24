# Slum-Scholars

**Slum Scholar** is an organization dedicated to helping children from slum areas by providing access to quality education. In addition to education, the organization supports children through essential services such as donations of old clothes, food distribution, and healthcare facilities, ensuring their holistic well-being and development.Built using the **MERN stack** (MongoDB, Express, React, Node.js). This is an open-source project aimed at creating a web platform to promote the activities of **Slum-Schloars**, a charitable organization, and facilitate online donations, volunteer registrations, and events.

## Features

- **Home Page**: A welcoming home page showcasing the vision and mission of Slum-Schloars.
- **About Us**: Learn about the history, objectives, and initiatives undertaken by Swadesh Slum-Schloars.
- **Programs**: Detailed information on various charitable programs, including healthcare camps, educational programs, etc.
- **Donation**: Secure and integrated online donation system to facilitate contributions via Razorpay.
- **Volunteer Registration**: Easy-to-use form for potential volunteers to join and contribute to the organization’s mission.
- **Event Management**: An event section that allows users to view upcoming events and participate.
- **Contact Us**: Connect with the organization via an interactive contact form or locate us using integrated maps.

## Tech Stack

- **Frontend**: React.js
  - Responsive design 
  - State management using Redux (if required for larger app structure)
  
- **Backend**: Node.js with Express.js
  - RESTful APIs for handling requests such as donations, contact-us, etc.
  
- **Database**: MongoDB
  - For storing data on volunteers, donations, and events.
  

Here’s the updated section for contributing, including the correct repository URL:

---

## How to Contribute

We welcome contributions from the open-source community! Here's how you can get involved:

1. **Fork the repository**: Click on the 'Fork' button at the top right of this repository.
2. **Clone your forked repo**:
   ```bash
   git clone https://github.com/yourusername/Slum-Scholars.git
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes**.
5. **Commit and push** your changes:
   ```bash
   git commit -m "Added feature: your feature name"
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**: Submit a PR on the original repository. Include a clear description of your changes.

### Guidelines

- Ensure your code adheres to our [code of conduct](CODE_OF_CONDUCT.md).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ContriHUB/Slum-Scholars.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Slum-Scholars
   ```
3. Install backend and frontend dependencies:
   ```bash
   npm install
   cd server
   npm install
   ```
4. Create .env inside server folder to setup MONGO DB ATLAS
   ```bash
   MONGO_URI='your-connection-string'
   ```  
5. Run the development server:
   In the root to start frontend
   ```bash
   npm run dev
   ```
   To run backend
   ```bash
   cd server
   npm start
   ```
   
---

This will ensure that contributors have the correct repository URL and instructions to set up the project.


Feel free to update this according to your project's structure and specific details from the brochure as you build the app.
