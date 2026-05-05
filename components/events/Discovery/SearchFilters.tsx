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
      <div className="flex flex-col lg:flex-row items-end justify-between gap-8 px-0 mt-0">
        <div className="max-w-xl w-full">
           <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-base font-black text-slate-400 uppercase tracking-widest">Find Your Next Challenge</h2>
           </div>
           
           <div className="relative group">
             <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
             <input 
               type="text" 
               placeholder="Hackathons, design sprints, or cultural fests..." 
               className="w-full bg-white border border-slate-100 pl-16 pr-8 py-5 rounded-[24px] text-lg focus:ring-[12px] focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all shadow-sm hover:shadow-lg"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Competition', 'Workshop', 'Fest', 'Seminar'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeFilter === cat ? 'bg-white text-slate-900 shadow-xl shadow-slate-200/50' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY NAVIGATION BUTTONS */}
      <div className="flex flex-wrap items-center gap-4 px-0 mt-2 mb-4">
        {[
          { id: 'tour-closing', label: 'Closing Soon' },
          { id: 'tour-upcoming', label: 'Upcoming Feed' },
          { id: 'tour-past', label: 'Past Feed' }
        ].map(nav => (
          <button
            key={nav.id}
            onClick={() => {
               setActiveNav(nav.id);
               const el = document.getElementById(nav.id);
               if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`flex-1 min-w-[200px] py-4 rounded-2xl font-bold text-sm transition-all  border-2 ${
              'bg-white text-slate-600 border-slate-100 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            {nav.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default React.memo(SearchFilters);
