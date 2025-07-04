import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBookOpen } from 'react-icons/fa';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { text: 'Specialties', icon: FaBookOpen, path: '/specialties' },
    { text: 'Resources', path: '/resources' },
    { text: 'Channels', path: '/channels' },
    { text: 'Partnerships', path: '/partnerships' },
    { text: 'Newsroom', path: '/newsroom' },
    { text: 'About Us', path: '/about-us' }
  ];

  return (
    <header className={`sticky top-0 z-50 ${isVisible ? 'opacity-100' : 'opacity-0 -translate-y-full'} transition-all duration-300`} style={{
      position: 'fixed',
      width: '100%'
    }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="block">
              <img src="/logo512.png" alt="ZJNNP Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#1f5f43] hover:text-[#103b55] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex justify-center gap-8">
            {menuItems.map((navItem) => (
              <Link 
                key={navItem.path}
                to={navItem.path}
                className="flex items-center gap-2 transition-all duration-200 text-[#1f5f43] hover:text-[#103b55] relative group"
              >
                {navItem.icon && React.createElement(navItem.icon, { className: "text-lg text-[#1f5f43]" })}
                <span className="group-hover:underline group-hover:underline-offset-4">{navItem.text}</span>
              </Link>
            ))}
          </nav>

          {/* Authentication Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/sign-in"
              className="flex items-center gap-2 transition-all duration-200 text-[#1f5f43] hover:text-[#103b55] relative group"
            >
              <FaUser className="text-lg text-[#1f5f43]" />
              <span className="group-hover:underline group-hover:underline-offset-4">Sign In</span>
            </Link>
            <Link 
              to="/join-now"
              className="flex items-center gap-2 transition-all duration-200 text-[#1f5f43] hover:text-[#103b55] relative group"
            >
              <FaUser className="text-lg text-[#1f5f43]" />
              <span className="group-hover:underline group-hover:underline-offset-4">Join Now</span>
            </Link>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
              <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-[#1f5f43]">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((navItem) => (
                    <Link 
                      key={navItem.path}
                      to={navItem.path}
                      className="block py-2 text-[#1f5f43] hover:text-[#103b55]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {navItem.icon && React.createElement(navItem.icon, { className: "inline-block mr-2 text-lg" })}
                      {navItem.text}
                    </Link>
                  ))}
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <Link 
                      to="/sign-in"
                      className="block py-2 text-[#1f5f43] hover:text-[#103b55]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUser className="inline-block mr-2 text-lg" />
                      Sign In
                    </Link>
                    <Link 
                      to="/join-now"
                      className="block py-2 text-[#1f5f43] hover:text-[#103b55]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUser className="inline-block mr-2 text-lg" />
                      Join Now
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
