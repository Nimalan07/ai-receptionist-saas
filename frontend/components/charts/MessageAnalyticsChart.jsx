"use client";

import {

  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip

} from "recharts";

export default function MessageAnalyticsChart({

  data

}) {

  return (

  <div className="
  rounded-3xl
  border border-slate-800
  bg-slate-900/60
  p-6
  mt-8
  w-full
  overflow-hidden
">

      <div className="mb-6">

        <h2 className="
          text-2xl font-bold
        ">
          Message Activity
        </h2>

        <p className="
          text-slate-400 mt-1
        ">
          Last 7 days
        </p>

      </div>

      <div className="
  h-[350px]
  w-full
  min-w-0
">
<ResponsiveContainer
  width="99%"
  height="100%"
>

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorMessages"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#6366f1"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="date"
              stroke="#94a3b8"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="messages"
              stroke="#06b6d4"
              fillOpacity={1}
              fill="url(#colorMessages)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}