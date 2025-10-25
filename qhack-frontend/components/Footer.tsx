'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="h-16 border-t border-slate-200 bg-slate-50"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="text-slate-600 text-sm leading-[1.5] transition-colors duration-200 hover:text-slate-900">
            © {currentYear} Team QHackers
          </div>
          <div className="text-slate-600 text-sm font-medium leading-[1.5] transition-colors duration-200 hover:text-blue-600">
            GenQ Hackathon 2025
          </div>
          <div className="text-slate-600 text-sm leading-[1.5] transition-colors duration-200 hover:text-violet-600">
            Powered by Qiskit
          </div>
        </div>
      </div>
    </footer>
  );
}
