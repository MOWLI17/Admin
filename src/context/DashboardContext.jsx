import React, { useState, useEffect } from 'react';
import { DashboardContext } from './DashboardContextObject';

export const DashboardProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Chief Engineer', status: 'Active', location: { x: 20, y: 30 }, avatar: 'https://i.pravatar.cc/150?u=1', efficiency: '98%' },
    { id: 2, name: 'Sarah Chen', role: 'Safety Inspector', status: 'Ongoing', location: { x: 45, y: 55 }, avatar: 'https://i.pravatar.cc/150?u=2', efficiency: '92%' },
    { id: 3, name: 'James Wilson', role: 'Site Foreman', status: 'Idle', location: { x: 70, y: 40 }, avatar: 'https://i.pravatar.cc/150?u=3', efficiency: '85%' },
    { id: 4, name: 'Elena Petrova', role: 'Project Manager', status: 'Active', location: { x: 55, y: 80 }, avatar: 'https://i.pravatar.cc/150?u=4', efficiency: '96%' },
    { id: 5, name: 'Marcus Thorne', role: 'Heavy Op', status: 'Active', location: { x: 10, y: 85 }, avatar: 'https://i.pravatar.cc/150?u=5', efficiency: '89%' },
    { id: 6, name: 'Lila Vance', role: 'Architect', status: 'Ongoing', location: { x: 80, y: 15 }, avatar: 'https://i.pravatar.cc/150?u=6', efficiency: '94%' },
    { id: 7, name: 'David Cho', role: 'Electrician', status: 'On Leave', location: { x: 30, y: 20 }, avatar: 'https://i.pravatar.cc/150?u=7', efficiency: '91%' },
    { id: 8, name: 'Nina Simone', role: 'Structural Analyst', status: 'Active', location: { x: 65, y: 60 }, avatar: 'https://i.pravatar.cc/150?u=8', efficiency: '97%' },
    { id: 9, name: 'Robert Fox', role: 'Concrete Specialist', status: 'Ongoing', location: { x: 40, y: 70 }, avatar: 'https://i.pravatar.cc/150?u=9', efficiency: '84%' },
    { id: 10, name: 'Ava Gupta', role: 'HR Builder', status: 'Idle', location: { x: 15, y: 50 }, avatar: 'https://i.pravatar.cc/150?u=10', efficiency: '93%' },
    { id: 11, name: 'Tom Hardy', role: 'Plumber', status: 'Active', location: { x: 90, y: 90 }, avatar: 'https://i.pravatar.cc/150?u=11', efficiency: '88%' },
    { id: 12, name: 'Sophia Loren', role: 'Interior Designer', status: 'Active', location: { x: 25, y: 75 }, avatar: 'https://i.pravatar.cc/150?u=12', efficiency: '95%' },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alex Rivera', text: 'Team, concrete pouring at Sector 4 is delayed by 2 hours.', time: '09:12 AM' },
    { id: 2, sender: 'Elena Petrova', text: 'Copy that Alex. Marcus, can you move the heavy loaders to Sector B instead?', time: '09:15 AM' },
    { id: 3, sender: 'Marcus Thorne', text: 'On it. Moving now. Estimated arrival 5 mins.', time: '09:16 AM' },
    { id: 4, sender: 'Sarah Chen', text: 'Safety check completed for the new scaffolding.', time: '10:05 AM' },
    { id: 5, sender: 'Nina Simone', text: 'Structural load analysis for the roof is green.', time: '10:45 AM' },
  ]);

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          location: {
            x: Math.min(Math.max(user.location.x + (Math.random() - 0.5) * 5, 0), 100),
            y: Math.min(Math.max(user.location.y + (Math.random() - 0.5) * 5, 0), 100),
          },
        }))
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const sendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <DashboardContext.Provider value={{ users, messages, sendMessage }}>
      {children}
    </DashboardContext.Provider>
  );
};
