import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Search, Paperclip, MoreHorizontal, Smile } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../../hooks/useDashboard';

const MessagingHub = () => {
  const { users, messages, sendMessage } = useDashboard();
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[700px] w-full rounded-[40px] border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6 bg-white">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1e40af]/10 text-[#1e40af]">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight text-[#1e293b]">Team Hub</h3>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-[#94a3b8]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
              {users.length} Syncing
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="text-[#94a3b8] hover:text-[#1e40af] transition-colors"><Search className="h-5 w-5" /></button>
          <button className="text-[#94a3b8] hover:text-[#1e40af] transition-colors"><MoreHorizontal className="h-5 w-5" /></button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 scrollbar-hide flex flex-col gap-8 bg-[#f8fafc]"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isMe = msg.sender === 'You';
            return (
              <Motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout
                className={`flex gap-4 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isMe && (
                  <div className="h-10 w-10 flex-shrink-0 rounded-2xl border-2 border-white bg-white shadow-lg overflow-hidden">
                    <img src={users.find(u => u.name === msg.sender)?.avatar || 'https://i.pravatar.cc/150'} alt={msg.sender} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className={`flex flex-col gap-1.5 max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe && <span className="text-[11px] font-black text-[#64748b] tracking-tight px-1 uppercase">{msg.sender}</span>}
                  <div className={`px-5 py-3.5 rounded-3xl text-[14px] font-bold leading-relaxed tracking-tight shadow-sm
                    ${isMe ? 'bg-[#1e40af] text-white rounded-tr-none shadow-[#1e40af]/20' : 'bg-white text-[#1e293b] rounded-tl-none border border-[#f1f5f9]'}
                  `}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#94a3b8] font-bold px-1 uppercase tracking-tighter">{msg.time}</span>
                </div>
              </Motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dynamic Input System */}
      <form onSubmit={handleSend} className="p-6 border-t border-[#f1f5f9] bg-white">
        <div className="relative flex items-center gap-4">
          <button type="button" className="text-[#94a3b8] hover:text-[#1e40af] transition-colors p-2"><Paperclip className="h-5 w-5" /></button>
          <div className="relative flex-1 group">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Send message to team..."
              className="w-full rounded-2xl border-2 border-[#f1f5f9] bg-white px-5 py-3.5 text-sm font-bold text-[#1e293b] outline-none focus:border-[#1e40af] transition-all placeholder:text-[#94a3b8]"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 text-[#94a3b8]">
                <button type="button" className="hover:text-[#fbbf24] transition-colors"><Smile className="h-5 w-5" /></button>
            </div>
          </div>
          <button 
            type="submit"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1e40af] shadow-xl shadow-[#1e40af]/20 text-white transition-all hover:bg-[#1d4ed8] hover:scale-110 active:scale-95 disabled:opacity-50 disabled:scale-100"
            disabled={!inputText.trim()}
          >
            <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessagingHub;
