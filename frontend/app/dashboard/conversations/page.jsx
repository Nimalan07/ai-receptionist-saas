"use client";

import { useState } from "react";

import ConversationList from "@/components/dashboard/ConversationList";

import ChatWindow from "@/components/dashboard/ChatWindow";

import useConversations from "@/hooks/useConversations";

import useMessages from "@/hooks/useMessages";


export default function ConversationsPage() {

  const {
    conversations
  } = useConversations();

  const [
    selectedConversation,
    setSelectedConversation
  ] = useState(null);

  const {
    messages
  } = useMessages(
    selectedConversation?.id
  );

  return (

    <div className="
      h-[calc(100vh-120px)]
      flex
      rounded-3xl
      overflow-hidden
      border border-slate-800
    ">

      <ConversationList
        conversations={conversations}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />

      <ChatWindow
        messages={messages}
        selectedConversation={selectedConversation}
      />

    </div>
  );
}