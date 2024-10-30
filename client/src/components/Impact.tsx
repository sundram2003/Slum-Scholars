import React from 'react';
import { Users, GraduationCap, Utensils, Heart } from 'lucide-react';

const Impact = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      number: "1000+",
      label: "Children Educated"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-indigo-600" />,
      number: "2,50+",
      label: "Graduates"
    },
    {
      icon: <Utensils className="h-8 w-8 text-indigo-600" />,
      number: "1000+",
      label: "Meals Provided"
    },
    {
      icon: <Heart className="h-8 w-8 text-indigo-600" />,
      number: "2000+",
      label: "Volunteer Hours"
    }
  ];

  const testimonials = [
    {
      quote: "Swadesh Seva Sansthan transformed my life by giving me access to education and support I never thought possible.",
      author: "Rahul, Beneficiary",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      quote: "The organization's healthcare and education initiatives have brought hope and opportunities to our entire village.",
      author: "Priya, Parent",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every day, we strive to create lasting change in the lives of underprivileged children and their communities. Here’s what we have achieved together.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
