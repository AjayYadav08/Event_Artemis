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
      {/* Page-level back navigation — outside main container */}
      <div className="flex items-center">
        <button
          onClick={() => { setShowJoinTeamView(false); setShowTeamsView(false); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 hover:shadow-lg transition-all group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Events Feed
        </button>
      </div>

      {/* Main Join Team container — unchanged */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Discover Teams</h2>
            <p className="text-sm font-medium text-slate-500">Find a squad and start building together.</p>
          </div>
          <div className="relative group w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="text"
              placeholder="Search hackathons..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:border-amber-300 focus:ring-4 focus:ring-amber-50 outline-none transition-all"
              value={teamSearchQuery}
              onChange={(e) => setTeamSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeamsPool.map(team => (
            <div key={team.id} className="bg-slate-50 border border-slate-100 rounded-[28px] p-6 hover:shadow-xl hover:shadow-slate-200 transition-all group border-b-4 border-b-slate-200 hover:border-b-amber-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="text-xl font-black text-amber-600">{team.name.charAt(0)}</span>
                </div>
                <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${team.status === 'Open' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-500'
                  }`}>
                  {team.status}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">{team.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-xs font-bold text-slate-400 truncate">{team.hackathon}</span>
              </div>

              <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">{team.description}</p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-300" />
                  <span className="text-sm font-black text-slate-400">{team.members.length}/{team.maxMembers}</span>
                </div>
                <button
                  onClick={() => setPreviewingTeam(team)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${team.status === 'Open'
                      ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-100'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                >
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
