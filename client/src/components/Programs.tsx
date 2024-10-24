import React from 'react';
import { Book, Apple, Shirt, Stethoscope } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      icon: <Book className="h-12 w-12 mb-4 text-indigo-600" />,
      title: "Education Program",
      description: "Offering free education and scholarships to children from underprivileged communities to ensure they have the opportunity for a better future.",
      features: ["Free school supplies", "After-school tutoring", "Scholarship programs"]
    },
    {
      icon: <Shirt className="h-12 w-12 mb-4 text-indigo-600" />,
      title: "Clothing Donations",
      description: "Distributing clean, high-quality clothing to children and families in need, focusing on school uniforms and essential daily wear.",
      features: ["Seasonal clothing", "School uniforms", "Winter essentials"]
    },
    {
      icon: <Apple className="h-12 w-12 mb-4 text-indigo-600" />,
      title: "Food Support Program",
      description: "Providing daily nutritious meals and food packages to children and families, ensuring that no one goes hungry.",
      features: ["Daily meal plans", "Nutrition awareness", "Family food packages"]
    },
    {
      icon: <Stethoscope className="h-12 w-12 mb-4 text-indigo-600" />,
      title: "Healthcare Services",
      description: "Delivering essential healthcare services, including medical check-ups, vaccinations, and health workshops to promote well-being.",
      features: ["Free health check-ups", "Vaccination drives", "Health education workshops"]
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Programs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Through our diverse programs, we aim to address the core needs of underprivileged communities, empowering children and families for a brighter tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                {program.icon}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <ul className="text-left space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
