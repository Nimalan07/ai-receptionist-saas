"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import MessageAnalyticsChart from "@/components/charts/MessageAnalyticsChart";

import useDailyStats from "@/hooks/useDailyStats";

import {

  Database,

  HardDrive,

  Activity

} from "lucide-react";


export default function AnalyticsPage() {

  const stats =
    useDailyStats();

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function fetchAnalytics() {

      try {

        const response =
          await api.get(
            "/analytics"
          );

        setAnalytics(
          response.data
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    }

    fetchAnalytics();

  }, []);


  return (

    <div>

      {/* Header */}

      <div className="mb-8">

        <h1 className="
          text-4xl
          font-bold
          text-white
        ">
          Analytics 📊
        </h1>

        <p className="
          text-slate-400
          mt-2
        ">
          Monitor AI assistant activity and engagement.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="
        grid
        md:grid-cols-3
        gap-6
        mb-10
      ">

        {/* Sources */}

        <div className="
          rounded-3xl
          border border-slate-800
          bg-slate-900/70
          p-8
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-slate-400
              ">
                Knowledge Sources
              </p>

              <h2 className="
                text-4xl
                font-black
                mt-3
                text-white
              ">
                {
                  loading
                    ? "..."
                    : analytics?.total_sources || 0
                }
              </h2>

            </div>

            <div className="
              w-16 h-16
              rounded-2xl
              bg-cyan-500/20
              flex items-center
              justify-center
            ">

              <Database
                size={32}
                className="
                  text-cyan-400
                "
              />

            </div>

          </div>

        </div>

        {/* Chunks */}

        <div className="
          rounded-3xl
          border border-slate-800
          bg-slate-900/70
          p-8
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-slate-400
              ">
                Total Chunks
              </p>

              <h2 className="
                text-4xl
                font-black
                mt-3
                text-white
              ">
                {
                  loading
                    ? "..."
                    : analytics?.total_chunks || 0
                }
              </h2>

            </div>

            <div className="
              w-16 h-16
              rounded-2xl
              bg-indigo-500/20
              flex items-center
              justify-center
            ">

              <HardDrive
                size={32}
                className="
                  text-indigo-400
                "
              />

            </div>

          </div>

        </div>

        {/* AI Health */}

        <div className="
          rounded-3xl
          border border-slate-800
          bg-slate-900/70
          p-8
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-slate-400
              ">
                AI Health
              </p>

              <h2 className="
                text-3xl
                font-black
                mt-3
                text-emerald-400
              ">
                {
                  loading
                    ? "..."
                    : analytics?.ai_status || "Healthy"
                }
              </h2>

            </div>

            <div className="
              w-16 h-16
              rounded-2xl
              bg-emerald-500/20
              flex items-center
              justify-center
            ">

              <Activity
                size={32}
                className="
                  text-emerald-400
                "
              />

            </div>

          </div>

        </div>

      </div>

      {/* Chart */}

      <div className="
        rounded-3xl
        border border-slate-800
        bg-slate-900/70
        p-8
      ">

       

        <MessageAnalyticsChart
          data={stats}
        />

      </div>
<div className="
  mt-10
  rounded-3xl
  border border-slate-800
  bg-slate-900/70
  p-8
">

  <h2 className="
    text-2xl
    font-bold
    text-white
    mb-6
  ">
    Recent Knowledge Activity
  </h2>

  <div className="
    overflow-hidden
    rounded-2xl
    border border-slate-800
  ">

    <table className="
      w-full
    ">

      <thead>

        <tr className="
          bg-slate-950
        ">

          <th className="
            text-left
            p-4
            text-slate-400
          ">
            Source
          </th>

          <th className="
            text-left
            p-4
            text-slate-400
          ">
            Type
          </th>

          <th className="
            text-left
            p-4
            text-slate-400
          ">
            Chunks
          </th>

        </tr>

      </thead>

      <tbody>

        {

          analytics?.recent_sources?.map(

            (item, index) => (

              <tr

                key={index}

                className="
                  border-t
                  border-slate-800
                "
              >

                <td className="
                  p-4
                  text-white
                ">
                  {item.name}
                </td>

                <td className="
                  p-4
                ">

                  {

                    item.type ===
                    "website"

                      ? "🌐 Website"

                      : "📄 PDF"
                  }

                </td>

                <td className="
                  p-4
                  text-cyan-400
                ">
                  {item.chunks}
                </td>

              </tr>
            )
          )
        }

      </tbody>

    </table>

  </div>

</div>
    </div>
  );
}