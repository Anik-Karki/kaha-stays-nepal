
import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import WhyBookWithKaha from '../components/WhyBookWithKaha';
import SearchDestinations from '../components/SearchDestinations';
import HowItWorks from '../components/HowItWorks';
import DownloadApp from '../components/DownloadApp';
import JoinAsPartner from '../components/JoinAsPartner';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroBanner />
        <WhyBookWithKaha />
        <SearchDestinations />
        <HowItWorks />
        <DownloadApp />
        <JoinAsPartner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
