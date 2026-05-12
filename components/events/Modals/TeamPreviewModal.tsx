import React from 'react';
import { X, MessageCircle, Rocket, Target } from 'lucide-react';
import { Team } from '../types';

interface TeamPreviewModalProps {
  previewingTeam: Team;
  setPreviewingTeam: (team: Team | null) => void;
  joinRequestMessage: string;
  setJoinRequestMessage: (val: string) => void;
  handleSendJoinRequest: (team: Team) => void;
  isSendingRequest: boolean;
}

const TeamPreviewModal: React.FC<TeamPreviewModalProps> = ({
  previewingTeam,
  setPreviewingTeam,
  joinRequestMessage,
  setJoinRequestMessage,
  handleSendJoinRequest,
  isSendingRequest
}) => {
  return (
    <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-white w-full max-w-xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 flex flex-col">
         {/* Compact Header Row */}
         <div className="relative p-5 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-4">
               {/* Team Avatar Box */}
               <div className="w-12 h-12 bg-white rounded-2xl p-1 shadow-md border border-slate-100 flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center">
                     <span className="text-xl font-black text-indigo-600">{previewingTeam.name.charAt(0)}</span>
                  </div>
               </div>
               
               {/* Team & Hackathon Info */}
               <div className="min-w-0 pr-10">
                  <div className="flex items-center gap-2 mb-0.5">
                     <h3 className="text-base font-black text-slate-900 truncate">{previewingTeam.name}</h3>
                     <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-lg uppercase tracking-widest shrink-0 ${
                       previewingTeam.status === 'Open' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                     }`}>
                       {previewingTeam.status}
                     </span>
                  </div>
                  <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest truncate mb-0.5">{previewingTeam.hackathon}</p>
                  <p className="text-[11px] font-medium text-slate-500 leading-tight line-clamp-1">{previewingTeam.description}</p>
               </div>
            </div>

            <button onClick={() => setPreviewingTeam(null)} className="absolute top-1/2 -translate-y-1/2 right-5 w-8 h-8 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-200 transition-all">
               <X className="w-4 h-4" />
            </button>
         </div>
         
         <div className="flex-1 overflow-y-auto p-5 scroll-smooth">
            
            <div className="space-y-4 mb-4">
               <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Members ({previewingTeam.members.length}/{previewingTeam.maxMembers})</h4>
                  <div className="grid grid-cols-2 gap-2">
                     {previewingTeam.members.map(m => (
                        <div key={m.id} className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                           <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full border border-white shadow-sm" />
                           <div className="min-w-0">
                              <p className="text-[10px] font-bold text-slate-800 truncate">{m.name}</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">{m.role}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Expectations Section */}
               {previewingTeam.expectations && previewingTeam.expectations.length > 0 && (
                  <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100 mb-4">
                     <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Target className="w-3.5 h-3.5" /> What is expected from you
                     </h4>
                     <ul className="space-y-1">
                        {previewingTeam.expectations.map((exp, idx) => (
                           <li key={idx} className="flex items-start gap-2 text-[11px] font-bold text-slate-600">
                              <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              {exp}
                           </li>
                        ))}
                     </ul>
                  </div>
               )}
               
               <div className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                     <MessageCircle className="w-3 h-3" /> Message to Host (Optional)
                  </label>
                  <textarea 
                     value={joinRequestMessage}
                     onChange={(e) => setJoinRequestMessage(e.target.value)}
                     placeholder="Tell them why you'd like to join..."
                     className="w-full h-16 bg-white border border-indigo-100 rounded-xl p-2.5 text-xs font-medium outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
                  />
               </div>
            </div>
            
            <button 
               onClick={() => handleSendJoinRequest(previewingTeam)}
               disabled={isSendingRequest || previewingTeam.status === 'Closed' || previewingTeam.members.length >= previewingTeam.maxMembers}
               className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {isSendingRequest ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               ) : (
                  <><Rocket className="w-4 h-4" /> Send Join Request</>
               )}
            </button>
         </div>
      </div>
    </div>
  );
};

export default TeamPreviewModal;
