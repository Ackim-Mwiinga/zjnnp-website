import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaBook, FaGlobe, FaCheck, FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About ZJNNP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#1f5f43] flex items-center justify-center">
                <FaBook className="text-xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#103b55]">About ZJNNP</h3>
            </div>
            <p className="text-gray-600 text-sm">
              A peer-reviewed, open-access quarterly journal dedicated to advancing neurological and mental-health research across sub-Saharan Africa.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-[#103b55] mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaEnvelope className="text-[#1f5f43]" />
                <a href="mailto:info@zjnnp.com" className="hover:text-[#1f5f43] transition-colors">
                  info@zjnnp.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaPhone className="text-[#1f5f43]" />
                <a href="tel:+260774081218" className="hover:text-[#1f5f43] transition-colors">
                  +260 774081218
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaGlobe className="text-[#1f5f43]" />
                <span>Maina Soko Medical Center</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-[#103b55] mb-4">Quick Links</h3>
            <ul className="space-y-2">

              <li>
                <a href="/articles" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1f5f43] transition-colors">
                  <FaCheck className="text-[#1f5f43]" />
                  Articles
                </a>
              </li>
              <li>
                <a href="/submit" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1f5f43] transition-colors">
                  <FaCheck className="text-[#1f5f43]" />
                  Submit Article
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Open Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-[#103b55] mb-4">Open Access</h3>
            <div className="bg-[#f8fafc] p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                This journal operates under a Creative Commons Attribution 4.0 International License.
              </p>
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#1f5f43] hover:text-[#103b55] transition-colors mt-2"
              >
                <FaCheck className="text-[#1f5f43]" />
                Learn more about our open access policy
              </a>
            </div>
          </motion.div>
        </div>

        {/* Connect With Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[#f8fafc] rounded-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-[#103b55] mb-4">Connect With Us</h3>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#1f5f43] text-white hover:bg-[#103b55] transition-colors"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-4">
            <button className="p-2 rounded-full bg-[#1f5f43]/10 hover:bg-[#1f5f43]/20 transition-colors">
              <FaTwitter className="text-[#1f5f43]" />
            </button>
            <button className="p-2 rounded-full bg-[#1f5f43]/10 hover:bg-[#1f5f43]/20 transition-colors">
              <FaFacebook className="text-[#1f5f43]" />
            </button>
            <button className="p-2 rounded-full bg-[#1f5f43]/10 hover:bg-[#1f5f43]/20 transition-colors">
              <FaLinkedin className="text-[#1f5f43]" />
            </button>
            <button className="p-2 rounded-full bg-[#1f5f43]/10 hover:bg-[#1f5f43]/20 transition-colors">
              <FaInstagram className="text-[#1f5f43]" />
            </button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-500">
          <p>&copy; 2025 ZJNNP Journal. All rights reserved.</p>
          <p className="mt-2">
            <a href="https://joshuamuhali-cv.web.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1f5f43] transition-colors">
              Designed by Joshua Muhali
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
