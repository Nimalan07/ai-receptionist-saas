"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function useAnalytics() {

  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const response = await api.get(
          "/dashboard/analytics"
        );

        setAnalytics(response.data);

      } catch (error) {

        console.error(
          "Analytics fetch error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchAnalytics();

  }, []);

  return {
    analytics,
    loading
  };
}