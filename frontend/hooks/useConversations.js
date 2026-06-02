"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function useConversations() {

  const [conversations, setConversations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchConversations =
      async () => {

      try {

        const response =
          await api.get(
            "/dashboard/conversations"
          );

        setConversations(
          response.data.conversations
        );

      } catch (error) {

        console.error(
          "Conversation fetch error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchConversations();

  }, []);

  return {
    conversations,
    loading
  };
}