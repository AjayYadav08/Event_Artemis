import React from 'react';
import { X, Rocket } from 'lucide-react';

interface CreateTeamFormProps {
  setShowCreateTeamForm: (val: boolean) => void;
  newTeamData: { hackathon: string, name: string, description: string, maxMembers: number };
  setNewTeamData: (data: any) => void;
  handleCreateTeam: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({
  setShowCreateTeamForm,
  newTeamData,
  setNewTeamData,
  handleCreateTeam
}) => {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl  -95  max-w-2xl mx-auto">
       <div className="flex items-center justify-between mb-8">
         <div>
           <h2 className="text-2xl font-black text-slate-900">Create New Team</h2>
           <p className="text-sm font-medium text-slate-500">Form your dream squad and start building.</p>
         </div>
         <button onClick={() => setShowCreateTeamForm(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-all">
           <X className="w-6 h-6" />
         </button>
       </div>
       
       <div className="space-y-6">
         <div>
           <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Hackathon Name</label>
           <input 
            type="text" 
            placeholder="e.g. Global AI Hackathon"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-all"
            value={newTeamData.hackathon}
            onChange={(e) => setNewTeamData({...newTeamData, hackathon: e.target.value})}
           />
         </div>
         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Team Name</label>
             <input 
              type="text" 
              placeholder="e.g. Neural Knights"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-all"
              value={newTeamData.name}
              onChange={(e) => setNewTeamData({...newTeamData, name: e.target.value})}
             />
           </div>
           <div>
             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Max Members</label>
             <select 
               className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-all"
               value={newTeamData.maxMembers}
               onChange={(e) => setNewTeamData({...newTeamData, maxMembers: parseInt(e.target.value)})}
             >
               <option value={2}>2 Members</option>
               <option value={3}>3 Members</option>
               <option value={4}>4 Members</option>
               <option value={5}>5 Members</option>
               <option value={6}>6 Members</option>
             </select>
           </div>
         </div>
         <div>
           <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Short Description</label>
           <textarea 
            placeholder="What is your team building?"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-all h-32 resize-none"
            value={newTeamData.description}
            onChange={(e) => setNewTeamData({...newTeamData, description: e.target.value})}
           />
         </div>
         
         <button 
           onClick={handleCreateTeam}
           className="w-full py-5 bg-emerald-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3"
         >
           <Rocket className="w-5 h-5" /> Launch Team
         </button>
       </div>
    </div>
  );
};

export default CreateTeamForm;
