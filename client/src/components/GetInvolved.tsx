import React from 'react';
import { HandHeart, DollarSign, Users, Building } from 'lucide-react';

const GetInvolved = () => {
  const options = [
    {
      icon: <HandHeart className="h-8 w-8 text-indigo-600" />,
      title: "Volunteer",
      description: "Join our team of volunteers and help in education, healthcare, and women empowerment initiatives.",
      action: "Apply Now"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-indigo-600" />,
      title: "Donate",
      description: "Your donation directly supports education, healthcare, and sustainability efforts for underprivileged communities.",
      action: "Donate Now"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Spread the Word",
      description: "Help raise awareness about our mission by sharing our work with your friends and family.",
      action: "Share"
    },
    {
      icon: <Building className="h-8 w-8 text-indigo-600" />,
      title: "Corporate Partnership",
      description: "Partner with us to create long-term social impact through Corporate Social Responsibility (CSR) programs.",
      action: "Partner With Us"
    }
  ];

  return (
    <section id="get-involved" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Get Involved</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            There are many ways to support our mission. Choose how you'd like to get involved and help us make a difference in the lives of those who need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {options.map((option, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{option.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200">
                  {option.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
