"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function useDailyStats() {

  const [stats, setStats] =
    useState([]);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response =
          await api.get(
            "/dashboard/daily-stats"
          );

        setStats(response.data);

      } catch (error) {

        console.error(
          "Daily stats error:",
          error
        );
      }
    };

    fetchStats();

  }, []);

  return stats;
}