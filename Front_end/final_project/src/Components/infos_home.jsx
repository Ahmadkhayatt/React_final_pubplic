// src/FaceRecognitionSection.js
import React from 'react';
import photo1 from '../assets/1.png';

const Infos = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 md:text-5xl">
          Say goodbye to outdated attendance methods and embrace the future with AI-powered face recognition technology for seamless and accurate attendance management.
        </h2>
        <p className="text-xl mb-12 md:text-2xl">
          Transform your attendance process with cutting-edge technology.
        </p>
        {/* Placeholder for images */}
        <div className="mt-12">
            <img src={photo1} alt="" width={500} className='md:w-1/2 mx-auto'/>
          {/* <div className="w-full md:w-1/2 h-96 bg-gray-300 rounded-lg shadow-lg mx-auto"></div> */}
        </div>
        {/* Call-to-action button */}
        
      </div>
    </section>
  );
};

export default Infos;