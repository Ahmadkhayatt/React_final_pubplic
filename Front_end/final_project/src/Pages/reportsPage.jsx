// ReportsPage.js
import React from 'react';
import Header from "../Components/Header";
import MainContent from '../Components/mainContent_report';
import Footer from '../Components/Footer';

const ReportsPage = () => {
  return (
    <>
      <Header />
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <MainContent />
    </div>
      <Footer />
    </>
  );
};

export default ReportsPage;