"use client";

import {
  MessageSquare,
  Users,
  BarChart3
} from "lucide-react";

export default function AnalyticsCards({ analytics }) {

  const cards = [
    {
      title: "Total Conversations",
      value: analytics?.total_conversations || 0,
      icon: MessageSquare,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Total Messages",
      value: analytics?.total_messages || 0,
      icon: BarChart3,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Active Customers",
      value: analytics?.total_users || 0,
      icon: Users,
      gradient: "from-emerald-500 to-green-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              relative overflow-hidden
              rounded-3xl
              p-[1px]
              bg-gradient-to-r ${card.gradient}
            `}
          >

            <div className="
              bg-slate-900
              rounded-3xl
              p-6
              h-full
              border border-slate-800
            ">

              {/* Glow Effect */}
              <div className={`
                absolute top-0 right-0
                w-40 h-40
                bg-gradient-to-r ${card.gradient}
                opacity-10 blur-3xl
              `} />

              <div className="
                flex items-start justify-between
                relative z-10
              ">

                <div>

                  <p className="text-slate-400 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {card.value}
                  </h2>

                </div>

                <div className={`
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-r ${card.gradient}
                  flex items-center justify-center
                  shadow-lg
                `}>

                  <Icon size={26} />

                </div>

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}