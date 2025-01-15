// FeaturesSection.js
import React from "react";
import Card from "./Card";
import { GiCheckMark } from "react-icons/gi";
import Marquee from "react-fast-marquee";

const FeaturesSection = () => {
  const cardsData = [
    {
      icon: GiCheckMark,
      title: "Real-Time Attendance Tracking",
      description:
        "Leverage advanced technology to monitor attendance instantly.",
    },
    {
      icon: GiCheckMark,
      title: "Comprehensive Reporting",
      description: "Generate detailed attendance reports with ease.",
    },
    {
      icon: GiCheckMark,
      title: "User-Friendly Interface",
      description: "Enjoy a seamless and intuitive user experience.",
    },
    {
      icon: GiCheckMark,
      title: "Customizable Settings",
      description: "Adapt the system to fit your specific needs.",
    },
  ];

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center">Why Choose Our System?</h2>
      <Marquee
        autoFill={true}
        direction="left"
        speed={40}
        pauseOnHover={true}
        gradient={window.innerWidth > 750}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </Marquee>
    </section>
  );
};

export default FeaturesSection;
