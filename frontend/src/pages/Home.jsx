import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ComingSoonSection from '../components/ComingSoonSection';

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <ComingSoonSection />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About ZJNNP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 leading-relaxed">
                A peer-reviewed, open-access quarterly journal dedicated to advancing neurological and mental-health research across sub-Saharan Africa.
              </p>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Aims</h3>
                  <p className="text-gray-600">
                    The ZJNNP is committed to advancing the understanding and practice of neurological sciences in sub-Saharan Africa. The journal welcomes original research, case reports, review articles, editorials, and commentaries focused on neurosurgery, neurology, psychiatry, neuroethics, and related fields.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mission</h3>
                  <p className="text-gray-600">
                    ZJNNP seeks to foster academic exchange, promote clinical excellence, and stimulate research innovation in neurological and mental health disciplines, with a special emphasis on context-relevant challenges and solutions in low- and middle-income countries.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/images/featured-issue.jpg"
                alt="Featured Issue"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Featured Issue</h3>
                <p className="text-gray-600">Explore our latest research on neurological disorders and mental health in sub-Saharan Africa.</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
