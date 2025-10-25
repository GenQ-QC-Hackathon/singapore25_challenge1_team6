'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer transition-opacity duration-200 hover:opacity-80">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  QHack
                </h1>
                <p className="text-xs text-slate-500 font-mono">
                  Quantum Risk Engine
                </p>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
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
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-mono text-slate-700">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
