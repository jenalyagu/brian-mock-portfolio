import { ArrowUp, Monitor, ShieldCheck, Zap } from "lucide-react";

export function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 md:py-20 px-4 sm:px-6 md:px-10" id="contact-footer">
      <div className="h-px w-full bg-white/5 mb-20" />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="flex flex-col">
          <span className="text-xl font-display font-bold tracking-tighter text-white">BM_PRODUCTIONS</span>
          <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 mt-2">©2026_ALL_RIGHTS_RESERVED</span>
          
          <div className="mt-10 flex gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3 w-3 text-zinc-700" />
              <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-zinc-700" />
              <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="h-3 w-3 text-zinc-700" />
              <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">Retina_Ready</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          <div>
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-6">Navigation</p>
            <ul className="space-y-4">
              <li><a href="#work" className="text-[10px] text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Selected_Work</a></li>
              <li><a href="#about" className="text-[10px] text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">About_Brian</a></li>
              <li><button onClick={onOpenContact} className="text-[10px] text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Comm_Link</button></li>
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-6">Social</p>
            <ul className="space-y-4">
              <li><a href="https://www.linkedin.com/in/bmock1/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">LinkedIn</a></li>
              <li><a href="#" className="text-[10px] text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Vimeo</a></li>
              <li><a href="#" className="text-[10px] text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Instagram</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <button 
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity"
            >
              <div className="h-12 w-12 border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <ArrowUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white">Return_To_Top</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-32 pt-10 border-t border-white/5 flex justify-between">
        <div className="flex gap-4">
          <div className="h-1 w-8 bg-white/20" />
          <div className="h-1 w-4 bg-white/10" />
          <div className="h-1 w-2 bg-white/5" />
        </div>
        <p className="text-[8px] font-mono text-zinc-800 uppercase tracking-[1em]">SYSTEM_CHECK_COMPLETE_STATUS_NOMINAL</p>
      </div>
    </footer>
  );
}

