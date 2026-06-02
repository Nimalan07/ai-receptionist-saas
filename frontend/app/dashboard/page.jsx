"use client";

import AnalyticsCards from "@/components/dashboard/AnalyticsCards";

import useAnalytics from "@/hooks/useAnalytics";

export default function DashboardPage() {

  const {
    analytics,
    loading
  } = useAnalytics();

  return (

    <div>

      {/* Header */}
      <div className="mb-8">

        <h1 className="
          text-4xl font-bold
        ">
          Welcome Back 👋
        </h1>

        <p className="
          text-slate-400 mt-2
        ">
          Here's what's happening with your AI assistant today.
        </p>

      </div>

      {/* Analytics Cards */}
      {loading ? (

        <div className="
          h-40
          rounded-3xl
          bg-slate-900
          border border-slate-800
          flex items-center justify-center
          text-slate-400
        ">

          Loading analytics...

        </div>

      ) : (

        <AnalyticsCards
          analytics={analytics}
        />

      )}

    </div>
  );
}