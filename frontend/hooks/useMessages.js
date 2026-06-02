"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function useMessages(
  conversationId
) {

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (!conversationId) return;

    const fetchMessages =
      async () => {

      try {

        setLoading(true);

        const response =
          await api.get(
            `/dashboard/conversations/${conversationId}/messages`
          );

        // IMPORTANT FIX
        setMessages(
          response.data.messages
        );

      } catch (error) {

        console.error(
          "Messages fetch error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchMessages();

  }, [conversationId]);

  return {
    messages,
    loading
  };
}