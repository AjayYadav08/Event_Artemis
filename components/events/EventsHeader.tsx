import React from 'react';
import { MessageCircle, Rocket, UserPlus } from 'lucide-react';
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
  showJoinTeamView
}) => {
  const { activeFlow, currentStepIndex, advanceStep, resetAllFlows } = useTutorial();

  return (
    <div className="sticky top-0 z-[100] px-8 py-8 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <button
          onClick={resetAllFlows}
          className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-[22px] flex items-center justify-center shadow-2xl shadow-indigo-200/50 hover:scale-105 active:scale-95 transition-all group relative overflow-hidden"
          title="Replay Onboarding Tutorial"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="text-2xl font-black text-white relative z-10 group-hover:rotate-12 transition-transform">⚡</span>
          <Rocket className="absolute -top-1 -right-1 w-4 h-4 text-white/40 rotate-45" />
        </button>
        <div>
          <div className="flex items-center gap-3 mb-0.5">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Event Artemis</h1>
            <div className="px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Live Hub</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">Discover & Participate</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* ACTION BUTTONS GROUP */}
        <div className="flex items-center p-1.5 bg-slate-50 border border-slate-100 rounded-[24px] shadow-inner">
          <button
            id="tour-teams-tab"
            onClick={() => {
              setShowTeamsView(true); // Always open, never toggle back
              setActiveTeam(null);
              setShowTeamMembers(false);
              setShowCreateTeamForm(false);
              setShowJoinTeamView(false);

              if (activeFlow === 'homepage' && currentStepIndex === 3) {
                advanceStep();
              }
            }}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${showTeamsView
              ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-100 border border-indigo-50'
              : 'text-slate-400 hover:text-indigo-600'
              }`}
          >
            <MessageCircle className="w-4 h-4" />
            {showTeamsView ? 'Current Teams' : 'Your Teams'}
            <span className={`ml-1 px-2 py-0.5 rounded-lg text-[10px] font-black ${showTeamsView ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {teams.length}
            </span>
          </button>

          {showTeamsView && (
            <div className="flex items-center gap-1.5 ml-1.5 pr-1.5 border-l border-slate-200 pl-1.5 animate-in slide-in-from-left-4 fade-in duration-500">
              <button
                id="tour-create-team-btn"
                onClick={() => { setShowCreateTeamForm(true); setShowJoinTeamView(false); setActiveTeam(null); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${showCreateTeamForm
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                  : 'text-emerald-600 hover:bg-emerald-50'
                  }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                New Team
              </button>
              <button
                id="tour-team-search"
                onClick={() => { setShowJoinTeamView(true); setShowCreateTeamForm(false); setActiveTeam(null); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${showJoinTeamView
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-100'
                  : 'text-amber-600 hover:bg-amber-50'
                  }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Join Team
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsHeader;
