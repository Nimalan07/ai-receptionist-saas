"use client";

import Link from "next/link";

import {

  LayoutDashboard,

  MessageSquare,

  BarChart3,

  FileUp,
Building2,
  Database,


  Settings

} from "lucide-react";
export default function Sidebar() {

  const menuItems = [

  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  },

  {
    name: "Conversations",
    icon: MessageSquare,
    href: "/dashboard/conversations"
  },

  {
    name: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics"
  },

  {
    name: "Upload",
    icon: FileUp,
    href: "/dashboard/upload"
  },
  {
    name: "Business Information",
    href: "/dashboard/company-facts",
    icon: Building2
  },
  {
    name: "Knowledge Base",
    icon: Database,
    href: "/dashboard/knowledge"
  },
  
 
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings"
  }
];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800">

        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
           CustomerAssist AI
          </h1>

          <p className="text-slate-400 text-sm">
            AI Receptionist SaaS
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="
                flex items-center gap-3
                px-4 py-3 rounded-xl
                text-slate-300
                hover:bg-slate-800
                hover:text-white
                transition-all duration-200
              "
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-800">

        <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 p-[1px] rounded-2xl">

          <div className="bg-slate-900 rounded-2xl p-4">

            <p className="text-sm text-slate-300">
              🚀 AI Support Platform
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Powered by RAG + WhatsApp
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}