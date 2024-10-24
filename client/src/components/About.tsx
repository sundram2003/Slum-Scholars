import React from 'react';
import { Heart, BookOpen, Users, Stethoscope, DollarSign, Briefcase } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Quality Education",
      description: "Providing free education, scholarships, and learning resources for underprivileged children."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Healthcare Access",
      description: "Offering free health camps and medical services to ensure healthcare for the needy."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Women Empowerment",
      description: "Empowering women through skill development and self-help group initiatives."
    },
    {
      icon: <Stethoscope className="h-6 w-6" />,
      title: "Environmental Sustainability",
      description: "Driving tree plantation, clean water projects, and renewable energy initiatives."
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Donate",
      description: "Support our programs through donations. Your help makes a difference in the lives of many."
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Corporate Partnerships",
      description: "Partner with us to enhance our mission through your Corporate Social Responsibility (CSR) programs."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">About Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Through education, healthcare, and empowerment programs, we are committed to uplifting underprivileged communities and helping them achieve self-reliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
