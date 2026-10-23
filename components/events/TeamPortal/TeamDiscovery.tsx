import React from 'react';
import { Search, MapPin, Users, Rocket, UserPlus, ChevronLeft } from 'lucide-react';
import { Team } from '../types';

interface TeamDiscoveryProps {
  setShowJoinTeamView: (val: boolean) => void;
  setShowTeamsView: (val: boolean) => void;
  teamSearchQuery: string;
  setTeamSearchQuery: (val: string) => void;
  filteredTeamsPool: Team[];
  setPreviewingTeam: (team: Team) => void;
}

const TeamDiscovery: React.FC<TeamDiscoveryProps> = ({
  setShowJoinTeamView,
  setShowTeamsView,
  teamSearchQuery,
  setTeamSearchQuery,
  filteredTeamsPool,
  setPreviewingTeam
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Main Join Team container */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Discover Teams</h2>
            <p className="text-sm font-medium text-slate-500">Find a squad and start building together.</p>
          </div>
          <div className="relative group w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0070F3] transition-colors" />
            <input
              type="text"
              placeholder="Search hackathons..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:border-[#0070F3] focus:ring-4 focus:ring-[#EBF3FF] outline-none transition-all"
              value={teamSearchQuery}
              onChange={(e) => setTeamSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeamsPool.map(team => (
            <div key={team.id} className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 rounded-2xl p-6 hover:shadow-sm transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 font-bold group-hover:bg-white group-hover:border-slate-300 group-hover:text-slate-900 transition-all shadow-sm">
                  <span className="text-lg font-black">{team.name.charAt(0)}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider ${team.status === 'Open' ? 'bg-[#EBF3FF] text-[#1D4ED8] border border-[#BFDBFE]' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {team.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{team.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-400 truncate">{team.hackathon}</span>
              </div>

              <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">{team.description}</p>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-700">{team.members.length}/{team.maxMembers}</span>
                </div>
                <button
                  onClick={() => setPreviewingTeam(team)}
                  disabled={team.status !== 'Open'}
                  className={`h-10 px-4 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm active:scale-[0.98] ${team.status === 'Open'
                      ? 'bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 active:bg-[#EBF3FF] active:border-[#BFDBFE] active:text-[#1D4ED8] text-slate-800'
                      : 'bg-slate-50 border border-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full ${team.status === 'Open' ? 'bg-[#1D4ED8]' : 'bg-slate-300'}`} />
                  {team.status === 'Open' ? 'View Team' : 'Team Closed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDiscovery;
