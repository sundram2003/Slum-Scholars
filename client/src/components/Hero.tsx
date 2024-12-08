import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    const userConfirmed = window.confirm(
      "Would you like to download our brochure?"
    );
    if (userConfirmed) {
      const link = document.createElement("a");
      link.href = "../../public/Swadesh Seva Sansthan (Brochure).pdf"; // Provide the correct path to your brochure
      link.download = "Slum_Scholar_Brochure.pdf"; // Set the filename for the download
      link.click(); // Trigger the download
    }
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Children studying"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Empowering Slum Children Through Education and Support
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Join us in our mission to provide education, healthcare, and essential
          resources to children in need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => navigate("/donate")}
          >
            Donate Now
          </button>
          <button
            className="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            onClick={handleLearnMore}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
