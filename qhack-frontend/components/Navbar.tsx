'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav 
      id="navigation"
      className="fixed top-0 left-0 right-0 z-50 glass shadow-sm"
      style={{ height: '64px' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link 
            href="/"
            aria-label="QHack - Home"
            className="focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded-lg"
          >
            <div className="flex items-center gap-3 cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-98">
              <Activity className="w-8 h-8 text-blue-600 transition-transform duration-200 hover:scale-110" aria-hidden="true" />
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                QHack
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="relative pb-1">
                      <span
                        className={`
                          text-base font-medium transition-colors duration-200
                          ${isActive
                            ? 'text-blue-600'
                            : 'text-slate-600 hover:text-blue-600'
                          }
                        `}
                      >
                        {link.label}
                      </span>
                      {isActive && (
                        <div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" 
                          style={{ height: '2px' }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700 transition-transform duration-200" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700 transition-transform duration-200" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass-strong shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-2" role="list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div
                        className={`
                          px-4 py-3 rounded-lg font-medium transition-colors duration-200
                          ${isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-600 hover:bg-slate-50'
                          }
                        `}
                      >
                        {link.label}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
