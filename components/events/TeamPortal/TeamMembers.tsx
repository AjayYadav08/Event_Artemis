import React from 'react';
import { Star, Shield, X } from 'lucide-react';
import { Team, TeamMember } from '../types';

interface TeamMembersProps {
  activeTeam: Team;
  removedMembers: Record<string, Set<string>>;
  teamHosts: Record<string, string>;
  submittedRatings: Record<string, { stars: number; feedback: string }>;
  handleMakeHost: (teamId: string, memberId: string) => void;
  setConfirmRemoveTarget: (id: string | null) => void;
  confirmRemoveTarget: string | null;
  handleRemoveMember: (teamId: string, memberId: string) => void;
  setRatingTarget: (id: string | null) => void;
  ratingTarget: string | null;
  setRatingStars: (stars: number) => void;
  ratingStars: number;
  setRatingFeedback: (feedback: string) => void;
  ratingFeedback: string;
  handleSubmitRating: () => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({
  activeTeam,
  removedMembers,
  teamHosts,
  submittedRatings,
  handleMakeHost,
  setConfirmRemoveTarget,
  confirmRemoveTarget,
  handleRemoveMember,
  setRatingTarget,
  ratingTarget,
  setRatingStars,
  ratingStars,
  setRatingFeedback,
  ratingFeedback,
  handleSubmitRating
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4   ">
      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Team Members</h4>
      {activeTeam.members
        .filter(m => !(removedMembers[activeTeam.id]?.has(m.id)))
        .map((member, mIdx) => {
        const isMemberHost = teamHosts[activeTeam.id] === member.id;
        const existingRating = submittedRatings[member.id];
        return (
        <div key={`${member.id}-${mIdx}`} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" />
                {isMemberHost && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1 rounded-lg shadow-md">
                    <Shield className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-black text-slate-900">{member.name} {member.id === 'me' && '(You)'}</h5>
                  {isMemberHost && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest border border-amber-100">Host</span>}
                </div>
                {/* Host Controls */}
                {teamHosts[activeTeam.id] === 'me' && member.id !== 'me' && (
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleMakeHost(activeTeam.id, member.id)}
                      className="text-[10px] font-black text-white bg-blue-500 hover:bg-blue-600 uppercase px-2.5 py-1 rounded-lg transition-all shadow-sm flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" /> Make Host
                    </button>
                    <button
                      onClick={() => setConfirmRemoveTarget(member.id)}
                      className="text-[10px] font-black text-white bg-rose-500 hover:bg-rose-600 uppercase px-2.5 py-1 rounded-lg transition-all shadow-sm flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-slate-400 mt-1">{member.role}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {member.skills.map((skill, sIdx) => (
                  <span key={`${skill}-${sIdx}`} className="px-2.5 py-1 bg-white text-[10px] font-bold text-slate-500 rounded-lg border border-slate-100">{skill}</span>
                ))}
              </div>
            </div>

            {/* Right: Rate Button */}
            {member.id !== 'me' && (
              <div className="shrink-0">
                {existingRating ? (
                  <button
                    onClick={() => { setRatingTarget(member.id); setRatingStars(existingRating.stars); setRatingFeedback(existingRating.feedback); }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#EBF3FF] rounded-2xl border border-[#BFDBFE] hover:bg-[#dbeafe] transition-all cursor-pointer shadow-sm text-[#1D4ED8] active:scale-[0.98]"
                  >
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-[#1D4ED8]">{existingRating.stars}/5</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">Rated</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setRatingTarget(member.id)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-2xl border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 active:bg-[#EBF3FF] active:border-[#BFDBFE] active:text-[#1D4ED8] text-slate-700 transition-all shadow-sm group active:scale-[0.98]"
                  >
                    <Star className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-active:text-[#1D4ED8] transition-all" />
                    <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-slate-900 group-active:text-[#1D4ED8]">Rate</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Remove Confirmation */}
          {confirmRemoveTarget === member.id && (
            <div className="px-4 pb-4 pt-2 border-t border-slate-100 duration-200">
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 flex items-center justify-between">
                <p className="text-xs font-bold text-rose-700">Remove {member.name.split(' ')[0]} from this team?</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setConfirmRemoveTarget(null)} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-slate-100 transition-all">Cancel</button>
                  <button onClick={() => { handleRemoveMember(activeTeam.id, member.id); setConfirmRemoveTarget(null); }} className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-[10px] font-bold hover:bg-rose-600 transition-all shadow-sm">Remove</button>
                </div>
              </div>
            </div>
          )}

          {/* Inline Rating UI */}
          {ratingTarget === member.id && (
            <div className="px-4 pb-4 pt-2 border-t border-slate-100 slide-in-from-top-2">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{existingRating ? 'Update' : 'Rate'} {member.name.split(' ')[0]}</span>
                  <button onClick={() => setRatingTarget(null)} className="text-slate-300 hover:text-slate-500 transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setRatingStars(s)} className="transition-transform hover:scale-125">
                      <Star className={`w-8 h-8 ${s <= ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} transition-colors`} />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Quick feedback (optional)..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium outline-none focus:border-[#0070F3] focus:ring-4 focus:ring-[#EBF3FF] transition-all"
                  value={ratingFeedback}
                  onChange={(e) => setRatingFeedback(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitRating()}
                />
                <button
                  onClick={handleSubmitRating}
                  disabled={ratingStars === 0}
                  className="w-full py-3.5 bg-[#0070F3] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-40 shadow-xl shadow-blue-200/50"
                >
                  {existingRating ? 'Update Rating' : 'Submit Rating'}
                </button>
              </div>
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
};

export default TeamMembers;
