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
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Team Members</h4>
      {activeTeam.members
        .filter(m => !(removedMembers[activeTeam.id]?.has(m.id)))
        .map((member, mIdx) => {
        const isMemberHost = teamHosts[activeTeam.id] === member.id;
        const existingRating = submittedRatings[member.id];
        return (
        <div key={`${member.id}-${mIdx}`} className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" />
                {isMemberHost && (
                  <div className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white p-0.5 rounded-md shadow-md">
                    <Shield className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="text-[13px] font-black text-slate-900">{member.name} {member.id === 'me' && '(You)'}</h5>
                  {isMemberHost && <span className="px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[7.5px] font-black uppercase rounded tracking-widest border border-amber-100">Host</span>}
                </div>
                {/* Host Controls */}
                {teamHosts[activeTeam.id] === 'me' && member.id !== 'me' && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <button
                      onClick={() => handleMakeHost(activeTeam.id, member.id)}
                      className="text-[9px] font-black text-white bg-blue-500 hover:bg-blue-600 uppercase px-2 py-0.5 rounded-md transition-all shadow-sm flex items-center gap-1"
                    >
                      <Shield className="w-2.5 h-2.5" /> Make Host
                    </button>
                    <button
                      onClick={() => setConfirmRemoveTarget(member.id)}
                      className="text-[9px] font-black text-white bg-rose-500 hover:bg-rose-600 uppercase px-2 py-0.5 rounded-md transition-all shadow-sm flex items-center gap-1"
                    >
                      <X className="w-2.5 h-2.5" /> Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-slate-400 mt-0.5">{member.role}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {member.skills.map((skill, sIdx) => (
                  <span key={`${skill}-${sIdx}`} className="px-2 py-0.5 bg-white text-[9px] font-bold text-slate-500 rounded-md border border-slate-100">{skill}</span>
                ))}
              </div>
            </div>

            {/* Right: Rate Button */}
            {member.id !== 'me' && (
              <div className="shrink-0">
                {existingRating ? (
                  <button
                    onClick={() => { setRatingTarget(member.id); setRatingStars(existingRating.stars); setRatingFeedback(existingRating.feedback); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EBF3FF] rounded-xl border border-[#BFDBFE] hover:bg-[#dbeafe] transition-all cursor-pointer shadow-sm text-[#1D4ED8] active:scale-[0.98]"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-[#1D4ED8]">{existingRating.stars}/5</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#1D4ED8]">Rated</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setRatingTarget(member.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 active:bg-[#EBF3FF] active:border-[#BFDBFE] active:text-[#1D4ED8] text-slate-700 transition-all shadow-sm group active:scale-[0.98]"
                  >
                    <Star className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 group-active:text-[#1D4ED8] transition-all" />
                    <span className="text-[9px] font-bold uppercase tracking-wider group-hover:text-slate-900 group-active:text-[#1D4ED8]">Rate</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Remove Confirmation */}
          {confirmRemoveTarget === member.id && (
            <div className="px-3.5 pb-3.5 pt-1.5 border-t border-slate-100 duration-200">
              <div className="bg-rose-50 rounded-lg p-3 border border-rose-100 flex items-center justify-between">
                <p className="text-[11px] font-bold text-rose-700">Remove {member.name.split(' ')[0]} from this team?</p>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setConfirmRemoveTarget(null)} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[9px] font-bold text-slate-500 hover:bg-slate-100 transition-all">Cancel</button>
                  <button onClick={() => { handleRemoveMember(activeTeam.id, member.id); setConfirmRemoveTarget(null); }} className="px-2.5 py-1 bg-rose-500 text-white rounded-md text-[9px] font-bold hover:bg-rose-600 transition-all shadow-sm">Remove</button>
                </div>
              </div>
            </div>
          )}

          {/* Inline Rating UI */}
          {ratingTarget === member.id && (
            <div className="px-3.5 pb-3.5 pt-1.5 border-t border-slate-100 slide-in-from-top-2">
              <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{existingRating ? 'Update' : 'Rate'} {member.name.split(' ')[0]}</span>
                  <button onClick={() => setRatingTarget(null)} className="text-slate-300 hover:text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setRatingStars(s)} className="transition-transform hover:scale-125">
                      <Star className={`w-6 h-6 ${s <= ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} transition-colors`} />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Quick feedback (optional)..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-medium outline-none focus:border-[#0070F3] focus:ring-4 focus:ring-[#EBF3FF] transition-all"
                  value={ratingFeedback}
                  onChange={(e) => setRatingFeedback(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitRating()}
                />
                <button
                  onClick={handleSubmitRating}
                  disabled={ratingStars === 0}
                  className="w-full py-2.5 bg-[#0070F3] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all disabled:opacity-40 shadow-lg shadow-blue-200/50"
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
