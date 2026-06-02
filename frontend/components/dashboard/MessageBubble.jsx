"use client";

import { Bot, User } from "lucide-react";

export default function MessageBubble({ msg }) {

  const isUser =
    msg.sender === "user";

  return (

    <div className={`
      flex items-end gap-3
      ${isUser ? "justify-start" : "justify-end"}
    `}>

      {/* Avatar LEFT */}
      {isUser && (

        <div className="
          w-10 h-10
          rounded-full
          bg-slate-800
          border border-slate-700
          flex items-center justify-center
          shrink-0
        ">
          <User size={18} />
        </div>

      )}

      {/* Bubble */}
      <div className={`
        max-w-[70%]
        px-5 py-4
        rounded-3xl
        shadow-lg

        ${
          isUser
            ? "bg-slate-800 text-white rounded-bl-md"
            : "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-br-md"
        }
      `}>

        <p className="
          text-sm leading-relaxed
        ">
          {msg.content}
        </p>

        <p className="
          text-[11px]
          mt-2 opacity-70
        ">
          {new Date(
            msg.timestamp
          ).toLocaleTimeString()}
        </p>

      </div>

      {/* Avatar RIGHT */}
      {!isUser && (

        <div className="
          w-10 h-10
          rounded-full
          bg-gradient-to-r
          from-cyan-500 to-indigo-500
          flex items-center justify-center
          shrink-0
        ">
          <Bot size={18} />
        </div>

      )}

    </div>
  );
}