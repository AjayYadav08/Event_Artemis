import React from 'react';
import { Search, Zap } from 'lucide-react';

interface SearchFiltersProps {
  showTeamsView: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
  setActiveNav: (val: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  showTeamsView,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  setActiveNav
}) => {
  if (showTeamsView) return null;

  return (
    <>
      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-4">
        <div className="max-w-2xl w-full">
           <div className="flex items-center gap-3 mb-5 px-1">
              <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
              <h2 className="text-base font-black text-slate-900 uppercase tracking-widest">Find Your Next Challenge</h2>
           </div>
           
           <div className="relative group">
             <div className="absolute inset-0 bg-blue-600/5 rounded-[28px] scale-[1.02] opacity-0 group-focus-within:opacity-100 transition-all duration-500 blur-xl" />
             <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-blue-600 transition-all duration-300" />
             <input 
               type="text" 
               placeholder="Search hackathons, workshops, or fests..." 
               className="relative w-full bg-white border border-slate-100 pl-18 pr-8 py-6 rounded-[28px] text-lg font-medium placeholder:text-slate-300 focus:ring-0 focus:border-blue-600/30 outline-none transition-all shadow-sm hover:shadow-xl hover:translate-y-[-2px]"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-slate-50 text-slate-400 rounded-2xl group-focus-within:bg-blue-600 group-focus-within:text-white transition-all cursor-pointer">
               <Search className="w-4 h-4" />
             </div>
           </div>
        </div>

        <div className="flex flex-wrap items-center p-1.5 bg-slate-50 border border-slate-100 rounded-[22px] shadow-inner" id="tour-filter">
          {['All', 'Competition', 'Workshop', 'Fest', 'Seminar'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeFilter === cat 
                  ? 'bg-white text-blue-600 shadow-lg shadow-blue-100 border border-blue-50' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY NAVIGATION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { id: 'tour-closing', label: 'Closing Soon', icon: '🔥', color: 'bg-rose-50 border-rose-100 text-rose-600' },
          { id: 'tour-upcoming', label: 'Upcoming Feed', icon: '⏰', color: 'bg-blue-50 border-blue-100 text-blue-600' },
          { id: 'tour-past', label: 'Past Feed', icon: '⌛', color: 'bg-slate-50 border-slate-100 text-slate-600' }
        ].map(nav => (
          <button
            key={nav.id}
            onClick={() => {
               setActiveNav(nav.id);
               const el = document.getElementById(nav.id);
               if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }}
            className={`flex items-center justify-center gap-3 py-5 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] transition-all border-2 group hover:scale-[1.02] active:scale-95 ${
              'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-900 shadow-sm hover:shadow-lg'
            }`}
          >
            <span className="text-lg group-hover:scale-125 transition-transform">{nav.icon}</span>
            {nav.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default React.memo(SearchFilters);
