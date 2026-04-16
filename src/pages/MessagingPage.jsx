import React from 'react';
import MessagingHub from '../components/messaging/MessagingHub';

const MessagingPage = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-[#f8fafc] p-10">
      <div className="w-full max-w-5xl h-full flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-[#1e293b]">Team Communications</h1>
          <p className="text-sm font-medium text-[#64748b]">Central hub for all on-site and office coordination.</p>
        </div>
        <div className="flex-1 min-h-0">
          <MessagingHub />
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
