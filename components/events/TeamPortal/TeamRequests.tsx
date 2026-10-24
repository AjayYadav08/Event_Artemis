import React from 'react';
import { UserPlus, X, Check } from 'lucide-react';
import { Team, JoinRequest } from '../types';

interface TeamRequestsProps {
  activeTeam: Team;
  joinRequests: Record<string, JoinRequest[]>;
  handleAcceptRequest: (request: JoinRequest) => void;
  handleRejectRequest: (request: JoinRequest) => void;
}

const TeamRequests: React.FC<TeamRequestsProps> = ({
  activeTeam,
  joinRequests,
  handleAcceptRequest,
  handleRejectRequest
}) => {
  const currentRequests = joinRequests[activeTeam.id] || [];
  const pendingRequests = currentRequests.filter(r => r.status === 'Pending');
  const historyRequests = currentRequests.filter(r => r.status !== 'Pending');

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
      <div>
         <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Pending Requests</h4>
         <p className="text-[11px] text-slate-500 font-medium mb-3.5">Users who want to join your team</p>
         
         <div className="space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="bg-white rounded-2xl p-7 border-2 border-dashed border-slate-100 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 text-slate-300">
                    <UserPlus className="w-6 h-6" />
                 </div>
                 <h5 className="text-sm font-bold text-slate-800 mb-1">No pending requests</h5>
                 <p className="text-[11px] text-slate-400 max-w-[220px]">When someone asks to join your team, their request will appear here.</p>
              </div>
            ) : (
              pendingRequests.map(request => (
                 <div key={request.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                       <div className="flex items-center gap-3">
                          <img src={request.userAvatar} alt={request.userName} className="w-10 h-10 rounded-xl border-2 border-white shadow-md" />
                          <div>
                             <h5 className="text-sm font-black text-slate-900">{request.userName}</h5>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{request.timestamp}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => handleRejectRequest(request)}
                            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-all flex items-center justify-center shadow-sm"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleAcceptRequest(request)}
                            className="w-8 h-8 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-all shadow-sm flex items-center justify-center"
                            title="Accept"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                       </div>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 relative">
                       <div className="absolute -top-2 left-4 w-3.5 h-3.5 bg-slate-50 border-t border-l border-slate-100 rotate-45" />
                       <p className="text-xs font-medium text-slate-600 leading-relaxed italic">"{request.message}"</p>
                    </div>
                 </div>
              ))
            )}
         </div>
      </div>

      {historyRequests.length > 0 && (
         <div className="pt-5 border-t border-slate-200">
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Request History</h4>
            <div className="space-y-2">
               {historyRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 border border-slate-100 opacity-60">
                     <div className="flex items-center gap-2.5">
                        <img src={request.userAvatar} alt={request.userName} className="w-7 h-7 rounded-md grayscale" />
                        <span className="text-[11px] font-bold text-slate-700">{request.userName}</span>
                     </div>
                     <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest ${
                       request.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                     }`}>
                       {request.status}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default TeamRequests;
