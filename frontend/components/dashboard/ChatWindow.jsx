"use client";

import { useEffect, useRef } from "react";

import {
  Download,
  FileText
} from "lucide-react";

import MessageBubble from "@/components/dashboard/MessageBubble";

export default function ChatWindow({

  messages = [],
  selectedConversation

}) {

  const bottomRef = useRef(null);

  // Auto scroll
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  // Empty state
  if (!selectedConversation) {

    return (

      <div
        className="
          flex-1
          flex items-center justify-center
          text-slate-500
          bg-slate-950
        "
      >

        <div className="text-center">

          <h2
            className="
              text-2xl font-bold
            "
          >
            No Conversation Selected
          </h2>

          <p
            className="
              text-slate-400
              mt-2
            "
          >
            Select a customer chat to begin.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div
      className="
        flex-1
        flex flex-col
        bg-slate-950
      "
    >

      {/* Header */}
      <div
        className="
          h-20
          border-b border-slate-800
          px-6
          flex items-center justify-between
          bg-slate-900/70
          backdrop-blur-xl
        "
      >

        {/* Customer Info */}
        <div>

          <h2
            className="
              text-xl
              font-bold
            "
          >
            +{selectedConversation.customer_number}
          </h2>

          <p
            className="
              text-sm
              text-slate-400
            "
          >
            WhatsApp Customer
          </p>

        </div>

        {/* Export Buttons */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* TXT Export */}
          <button
            onClick={() =>
              window.open(
                `http://localhost:8000/conversations/export/${selectedConversation.id}`,
                "_blank"
              )
            }
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-lg
              bg-cyan-500/10
              text-cyan-400
              hover:bg-cyan-500/20
              transition
            "
          >
            <Download size={16} />
            TXT
          </button>

          {/* PDF Export */}
          <button
            onClick={() =>
              window.open(
                `http://localhost:8000/conversations/export-pdf/${selectedConversation.id}`,
                "_blank"
              )
            }
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-lg
              bg-red-500/10
              text-red-400
              hover:bg-red-500/20
              transition
            "
          >
            <FileText size={16} />
            PDF
          </button>

        </div>

      </div>

      {/* Messages */}
      <div
        className="
          flex-1
          overflow-y-auto
          p-6
          space-y-5
        "
      >

        {messages.length === 0 ? (

          <div
            className="
              h-full
              flex items-center justify-center
              text-slate-500
            "
          >
            No messages yet.
          </div>

        ) : (

          messages.map((msg) => (

            <MessageBubble
              key={msg.id}
              msg={msg}
            />

          ))

        )}

        {/* Auto Scroll Target */}
        <div ref={bottomRef} />

      </div>

    </div>
  );
}