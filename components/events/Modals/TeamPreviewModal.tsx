import React from 'react';
import { X, MessageCircle, Rocket } from 'lucide-react';
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
    <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm  ">
      <div className="bg-white rounded-[32px] max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden scale-100  -95 duration-200">
         <div className="relative h-32 bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
            <button onClick={() => setPreviewingTeam(null)} className="absolute top-6 right-6 w-10 h-10 bg-black/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/20 transition-all">
               <X className="w-6 h-6" />
            </button>
            <div className="absolute -bottom-10 left-8 w-20 h-20 bg-white rounded-3xl p-1 shadow-xl">
               <div className="w-full h-full bg-slate-100 rounded-[20px] flex items-center justify-center">
                  <span className="text-3xl font-black text-indigo-600">{previewingTeam.name.charAt(0)}</span>
               </div>
            </div>
         </div>
         
         <div className="p-8 pt-14">
            <div className="flex items-center justify-between mb-2">
               <h3 className="text-2xl font-black text-slate-900">{previewingTeam.name}</h3>
               <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${
                 previewingTeam.status === 'Open' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
               }`}>
                 {previewingTeam.status}
               </span>
            </div>
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">{previewingTeam.hackathon}</p>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{previewingTeam.description}</p>
            
            <div className="space-y-6 mb-8">
               <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Current Members ({previewingTeam.members.length}/{previewingTeam.maxMembers})</h4>
                  <div className="grid grid-cols-2 gap-3">
                     {previewingTeam.members.map(m => (
                        <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
                           <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border border-white shadow-sm" />
                           <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">{m.name}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{m.role}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                     <MessageCircle className="w-3.5 h-3.5" /> Message to Host (Optional)
                  </label>
                  <textarea 
                     value={joinRequestMessage}
                     onChange={(e) => setJoinRequestMessage(e.target.value)}
                     placeholder="Tell them why you'd like to join..."
                     className="w-full h-24 bg-white border border-indigo-100 rounded-xl p-3 text-sm font-medium outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
                  />
               </div>
            </div>
            
            <button 
               onClick={() => handleSendJoinRequest(previewingTeam)}
               disabled={isSendingRequest || previewingTeam.status === 'Closed' || previewingTeam.members.length >= previewingTeam.maxMembers}
               className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {isSendingRequest ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
