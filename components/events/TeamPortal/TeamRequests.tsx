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
    <div className="flex-1 overflow-y-auto p-8 space-y-6    bg-slate-50/50">
      <div>
         <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Pending Requests</h4>
         <p className="text-xs text-slate-500 font-medium mb-6">Users who want to join your team</p>
         
         <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-slate-100 flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                    <UserPlus className="w-8 h-8" />
                 </div>
                 <h5 className="text-base font-bold text-slate-800 mb-1">No pending requests</h5>
                 <p className="text-xs text-slate-400 max-w-[200px]">When someone asks to join your team, their request will appear here.</p>
              </div>
            ) : (
              pendingRequests.map(request => (
                 <div key={request.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-4 mb-6">
                       <div className="flex items-center gap-4">
                          <img src={request.userAvatar} alt={request.userName} className="w-12 h-12 rounded-2xl border-2 border-white shadow-md" />
                          <div>
                             <h5 className="text-base font-black text-slate-900">{request.userName}</h5>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{request.timestamp}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleRejectRequest(request)}
                            className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors flex items-center justify-center"
                            title="Reject"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleAcceptRequest(request)}
                            className="w-10 h-10 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100 flex items-center justify-center"
                            title="Accept"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative">
                       <div className="absolute -top-2 left-4 w-4 h-4 bg-slate-50 border-t border-l border-slate-100 rotate-45" />
                       <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{request.message}"</p>
                    </div>
                 </div>
              ))
            )}
         </div>
      </div>

      {historyRequests.length > 0 && (
         <div className="pt-8 border-t border-slate-200">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Request History</h4>
            <div className="space-y-3">
               {historyRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/50 border border-slate-100 opacity-60">
                     <div className="flex items-center gap-3">
                        <img src={request.userAvatar} alt={request.userName} className="w-8 h-8 rounded-lg grayscale" />
                        <span className="text-xs font-bold text-slate-700">{request.userName}</span>
                     </div>
                     <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${
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
