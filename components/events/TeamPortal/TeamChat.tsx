import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Team, ChatMessage } from '../types';

interface TeamChatProps {
  activeTeam: Team;
  teamMessages: Record<string, ChatMessage[]>;
  chatInput: string;
  setChatInput: (val: string) => void;
  sendMessage: () => void;
  chatEndRef?: React.RefObject<HTMLDivElement>;
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(messages.length);
  const prevTeamId = useRef(activeTeam.id);

  // Target scrolling strictly to the chat's message container without moving the overall page
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isTeamChange = prevTeamId.current !== activeTeam.id;
    const isNewMessage = messages.length > prevMessagesLength.current;

    prevTeamId.current = activeTeam.id;
    prevMessagesLength.current = messages.length;

    if (isTeamChange) {
      container.scrollTop = container.scrollHeight;
    } else if (isNewMessage) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, activeTeam.id]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-gradient-to-b from-slate-50/50 to-white"
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] ${msg.isMe ? 'order-last' : ''}`}>
              {!msg.isMe && (
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">{msg.senderName}</span>
              )}
              <div className={`px-4 py-3 rounded-2xl ${
                msg.isMe
                  ? 'bg-[#0070F3] text-white rounded-br-md shadow-lg shadow-blue-200/50'
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
            id="tour-team-chat"
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-base font-medium outline-none focus:border-[#0070F3] focus:ring-4 focus:ring-[#EBF3FF] transition-all"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={!chatInput.trim()}
            className="w-11 h-11 rounded-2xl border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 active:bg-[#EBF3FF] active:border-[#BFDBFE] active:text-[#1D4ED8] bg-white text-slate-600 flex items-center justify-center shadow-sm transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:text-slate-400 active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;
