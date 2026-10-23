import React, { useState, useRef, useEffect } from 'react';
import { Search, Zap, SlidersHorizontal, ChevronDown, Check, MessageCircle, Rocket, UserPlus, ArrowLeft } from 'lucide-react';
import { Team } from './types';
import { useTutorial } from '../tutorial/TutorialContext';

interface EventsHeaderProps {
  showTeamsView: boolean;
  setShowTeamsView: (val: boolean) => void;
  setActiveTeam: (team: Team | null) => void;
  setShowTeamMembers: (val: boolean) => void;
  setShowCreateTeamForm: (val: boolean) => void;
  setShowJoinTeamView: (val: boolean) => void;
  teams: Team[];
  showCreateTeamForm: boolean;
  showJoinTeamView: boolean;
  // Search & filter props (pulled up from SearchFilters)
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
  activeNav: string;
  setActiveNav: (val: string) => void;
}

const EventsHeader: React.FC<EventsHeaderProps> = ({
  showTeamsView,
  setShowTeamsView,
  setActiveTeam,
  setShowTeamMembers,
  setShowCreateTeamForm,
  setShowJoinTeamView,
  teams,
  showCreateTeamForm,
  showJoinTeamView,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  activeNav,
  setActiveNav,
}) => {
  const { activeFlow, currentStepIndex, advanceStep } = useTutorial();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = ['All', 'Competition', 'Workshop', 'Fest', 'Seminar'];
  const navItems = [
    { id: 'tour-closing', label: 'Closing Soon', icon: '🔥' },
    { id: 'tour-upcoming', label: 'Upcoming Feed', icon: '⏰' },
    { id: 'tour-past', label: 'Past Feed', icon: '⌛' },
  ];

  return (
    <div className="sticky top-0 z-[100] px-8 pt-6 pb-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 mb-4 space-y-4">
      {/* ROW 1 */}
      <div className="flex items-center gap-3">
        {showTeamsView ? (
          <>
            {/* LEFT: Back to Events Feed button */}
            <div className="flex items-center p-1.5 bg-slate-50 border border-slate-100 rounded-[24px] shadow-inner shrink-0">
              <button
                onClick={() => {
                  setShowTeamsView(false);
                  setActiveTeam(null);
                  setShowTeamMembers(false);
                  setShowCreateTeamForm(false);
                  setShowJoinTeamView(false);
                }}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all bg-white text-slate-700 shadow-xl shadow-slate-100 border border-slate-50 hover:text-indigo-600"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events Feed
              </button>
            </div>

            {/* RIGHT: Team navigation buttons (Current Teams / New Team / Join Team) */}
            <div className="flex-1 bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all">
              <div className="flex items-center gap-2">
                <button
                  id="tour-teams-tab"
                  onClick={() => {
                    setActiveTeam(null);
                    setShowTeamMembers(false);
                    setShowCreateTeamForm(false);
                    setShowJoinTeamView(false);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${
                    !showCreateTeamForm && !showJoinTeamView
                      ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100 border border-indigo-50'
                      : 'text-slate-400 hover:text-indigo-600 hover:bg-white/60'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Current Teams
                  <span className={`ml-1 px-2 py-0.5 rounded-lg text-[10px] font-black ${
                    !showCreateTeamForm && !showJoinTeamView ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {teams.length}
                  </span>
                </button>

                <div className="w-px h-5 bg-slate-200/60 shrink-0" />

                <button
                  id="tour-create-team-btn"
                  onClick={() => { setShowCreateTeamForm(true); setShowJoinTeamView(false); setActiveTeam(null); }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${showCreateTeamForm
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                    : 'text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  New Team
                </button>

                <div className="w-px h-5 bg-slate-200/60 shrink-0" />

                <button
                  id="tour-team-search"
                  onClick={() => { setShowJoinTeamView(true); setShowCreateTeamForm(false); setActiveTeam(null); }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${showJoinTeamView
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-100'
                    : 'text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Join Team
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* LEFT: Your Teams button */}
            <div className="flex items-center p-1.5 bg-slate-50 border border-slate-100 rounded-[24px] shadow-inner shrink-0">
              <button
                id="tour-teams-tab"
                onClick={() => {
                  setShowTeamsView(true);
                  setActiveTeam(null);
                  setShowTeamMembers(false);
                  setShowCreateTeamForm(false);
                  setShowJoinTeamView(false);
                  if (activeFlow === 'homepage' && currentStepIndex === 3) {
                    advanceStep();
                  }
                }}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-slate-400 hover:text-indigo-600"
              >
                <MessageCircle className="w-4 h-4" />
                Your Teams
                <span className="ml-1 px-2 py-0.5 rounded-lg text-[10px] font-black bg-slate-200 text-slate-500">
                  {teams.length}
                </span>
              </button>
            </div>

            {/* RIGHT: Search Bar */}
            <div
              id="tour-search-bar"
              className="flex-1 bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-1 group">
                  <div className="absolute inset-0 bg-blue-500/5 rounded-[24px] opacity-0 group-focus-within:opacity-100 transition-all duration-500 blur-xl pointer-events-none" />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 group-focus-within:scale-110 transition-all duration-300 pointer-events-none z-10" />
                  <input
                    type="text"
                    placeholder="Search hackathons, workshops, or fests..."
                    className="w-full bg-white/80 border border-slate-100/50 pl-12 pr-20 py-3.5 rounded-[24px] text-sm font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 focus:bg-white outline-none transition-all duration-300 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-16 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors z-20"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    </button>
                  )}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2" ref={dropdownRef}>
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className={`p-2 rounded-xl transition-all flex items-center gap-2 z-20 ${
                        isFilterOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50/80 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                      }`}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                      {activeFilter !== 'All' && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white shadow-sm animate-in fade-in zoom-in duration-300" />
                      )}
                    </button>
                    {isFilterOpen && (
                      <div className="absolute right-0 top-full mt-4 w-56 bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 animate-in zoom-in-95 fade-in duration-200 origin-top-right z-[100]">
                        <div className="px-3 py-2 mb-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Filter Category</span>
                        </div>
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setActiveFilter(cat); setIsFilterOpen(false); }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                              activeFilter === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {cat}
                            {activeFilter === cat && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ROW 2: Feed navigation (Closing Soon / Upcoming Feed / Past Feed) — hidden in teams view */}
      {!showTeamsView && (
        <div className="flex items-center p-1.5 bg-slate-100/50 rounded-[22px] w-fit" id="tour-feed-nav">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <button
                onClick={() => {
                  setActiveNav(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                }}
                className="relative px-5 py-3 rounded-[18px] text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 text-slate-500 hover:text-slate-800 hover:bg-white/40"
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
              {index < navItems.length - 1 && (
                <div className="w-px h-4 bg-slate-300/40 mx-1 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsHeader;
