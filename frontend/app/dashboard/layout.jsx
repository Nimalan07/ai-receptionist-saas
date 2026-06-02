"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import useAuth from "@/hooks/useAuth";
import ChatWidget from "@/components/chat-widget/ChatWidget";
export default function DashboardLayout({ children }) {
  const authenticated =  useAuth();
  if (!authenticated) {

  return null;
}
  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {children}
        </main>
<ChatWidget />
      </div>
    </div>
  );
}