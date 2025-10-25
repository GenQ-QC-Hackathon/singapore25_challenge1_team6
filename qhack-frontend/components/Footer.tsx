"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="h-16 border-t border-slate-200 bg-slate-50"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full" style={{marginLeft: "555px"}}>
          <div className="text-slate-600 text-sm">
            © {currentYear} Team QHackers
          </div>
          <div className="text-slate-600 text-sm">GenQ Hackathon 2025</div>
          <div className="text-slate-600 text-sm">Powered by Qiskit</div>
        </div>
      </div>
    </footer>
  );
}
