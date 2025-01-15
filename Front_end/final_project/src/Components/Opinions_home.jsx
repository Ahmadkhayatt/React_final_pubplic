// src/TestimonialsSection.js
import React from 'react';
import Marquee from 'react-fast-marquee';
const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="p-6 border rounded-lg">
            <p className="text-lg text-gray-600">"This system has revolutionized how we manage attendance. Highly recommended!"</p>
            <p className="text-blue-600 font-bold mt-4">- Ahmet Abbas, HR Manager</p>
          </div>
          {/* Add more testimonials as needed */}
          
          <div className="p-6 border rounded-lg">
            <p className="text-lg text-gray-600">"This platform has completely transformed our workflow. It's efficient,
                                                     user-friendly, and has made our operations so much smoother!"</p>
            <p className="text-blue-600 font-bold mt-4">- Mehmet ramez, Web Designer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;