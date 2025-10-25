'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/"
            aria-label="QHack Quantum Risk Engine - Home"
          >
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer transition-opacity duration-200 hover:opacity-80">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" aria-hidden="true" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
                  QHack
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 font-mono hidden sm:block">
                  Quantum Risk Engine
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="relative">
                      <span
                        className={`
                          font-medium transition-colors duration-200
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
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600" 
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Status Indicator - Hidden on small mobile */}
          <div 
            className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-200 bg-slate-50"
            role="status"
            aria-label="System status: Online"
          >
            <div 
              className="w-2 h-2 rounded-full bg-emerald-500" 
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm font-mono text-slate-700">
              ONLINE
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
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
            {/* Mobile Status Indicator */}
            <div 
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-slate-50"
              role="status"
              aria-label="System status: Online"
            >
              <div 
                className="w-2 h-2 rounded-full bg-emerald-500" 
                aria-hidden="true"
              />
              <span className="text-sm font-mono text-slate-700">
                ONLINE
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
