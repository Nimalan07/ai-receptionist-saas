"use client";

import { useState } from "react";

import {
  Search,
  MessageCircleMore
} from "lucide-react";
import {
  Download,
  FileText
} from "lucide-react";
export default function ConversationList({

  conversations,
  selectedConversation,
  setSelectedConversation

}) {

  const [search, setSearch] =
    useState("");

  // Filter conversations
  const filteredConversations =
    conversations.filter((conv) =>

      conv.customer_number
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="
      w-80
      border-r border-slate-800
      bg-slate-900
      flex flex-col
    ">

      {/* Header */}
      <div className="
        p-5
        border-b border-slate-800
        space-y-4
      ">

        <div className="
          flex items-center justify-between
        ">

          <h2 className="
            text-2xl font-bold
          ">
            Conversations
          </h2>

          <div className="
            w-10 h-10
            rounded-xl
            bg-gradient-to-r
            from-cyan-500 to-indigo-500
            flex items-center justify-center
          ">

            <MessageCircleMore size={20} />

          </div>

        </div>

        {/* Search */}
        <div className="
          flex items-center gap-3
          bg-slate-800
          border border-slate-700
          rounded-2xl
          px-4 py-3
        ">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"

            placeholder="Search customer..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="
              bg-transparent
              outline-none
              text-sm
              flex-1
              placeholder:text-slate-500
            "
          />

        </div>

      </div>

      {/* Conversations */}
      <div className="
        flex-1
        overflow-y-auto
      ">

        {filteredConversations.length === 0 ? (

          <div className="
            h-full
            flex items-center justify-center
            text-slate-500
            p-6 text-center
          ">

            No conversations found.

          </div>

        ) : (

          filteredConversations.map((conv) => (

  <div
    key={conv.id}
    onClick={() =>
      setSelectedConversation(conv)
    }
    className={`
      w-full
      text-left
      p-4
      border-b border-slate-800
      transition-all
      hover:bg-slate-800/80
      cursor-pointer

      ${
        selectedConversation?.id === conv.id
          ? "bg-slate-800"
          : ""
      }
    `}
  >

              <div className="
                flex items-start gap-3
              ">

                {/* Avatar */}
                <div className="
                  w-12 h-12
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500 to-indigo-500
                  flex items-center justify-center
                  font-bold
                  shrink-0
                ">

                  {conv.customer_number[0]}

                </div>

                {/* Details */}
<div className="flex-1">

  <p className="
    font-semibold
    truncate
  ">
    +{conv.customer_number}
  </p>

  <p className="
    text-sm
    text-slate-400
    mt-1
  ">
    WhatsApp Customer
  </p>

</div>

<button

  onClick={(e) => {

    e.stopPropagation();

    window.open(

      `http://localhost:8000/conversations/export/${conv.id}`,

      "_blank"
    );
  }}

  className="
    p-2
    rounded-lg

    hover:bg-slate-700

    text-cyan-400
  "
>

  <Download size={18} />

</button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}