import React from 'react';
import { Send } from 'lucide-react';
import { Team, ChatMessage } from '../types';

interface TeamChatProps {
  activeTeam: Team;
  teamMessages: Record<string, ChatMessage[]>;
  chatInput: string;
  setChatInput: (val: string) => void;
  sendMessage: () => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

const TeamChat: React.FC<TeamChatProps> = ({
  activeTeam,
  teamMessages,
  chatInput,
  setChatInput,
  sendMessage,
  chatEndRef
}) => {
  const messages = teamMessages[activeTeam.id] || [];

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-gradient-to-b from-slate-50/50 to-white">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] ${msg.isMe ? 'order-last' : ''}`}>
              {!msg.isMe && (
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">{msg.senderName}</span>
              )}
              <div className={`px-4 py-3 rounded-2xl ${
                msg.isMe
                  ? 'bg-indigo-600 text-white rounded-br-md shadow-lg shadow-indigo-200/50'
                  : 'bg-white text-slate-700 rounded-bl-md shadow-sm border border-slate-100'
              }`}>
                <p className="text-base font-medium leading-relaxed">{msg.text}</p>
              </div>
              <span className={`text-[10px] font-bold text-slate-300 mt-1 block ${msg.isMe ? 'text-right mr-1' : 'ml-1'}`}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-slate-100 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-base font-medium outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={!chatInput.trim()}
            className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:shadow-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;
