"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import {
  FileText,
  Database,
  HardDrive
} from "lucide-react";

export default function KnowledgePage() {

  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchKnowledge() {

    try {

      const response =
        await api.get("/knowledge");

      setSources(
        response.data.sources || []
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchKnowledge();

  }, []);

  async function handleDelete(
    sourceId
  ) {

    const confirmed = window.confirm(
      "Delete this knowledge source?"
    );

    if (!confirmed) return;

    try {

      await api.delete(
        `/knowledge/${sourceId}`
      );

      fetchKnowledge();

    } catch (err) {

      console.error(err);

      alert(
        "Failed to delete source."
      );
    }
  }

  async function handleReindex(
    sourceId
  ) {

    try {

      await api.post(
        `/knowledge/reindex/${sourceId}`
      );

      alert(
        "Website re-indexed successfully."
      );

      fetchKnowledge();

    } catch (err) {

      console.error(err);

      alert(
        "Failed to re-index website."
      );
    }
  }

  return (

    <div className="
      max-w-7xl
      mx-auto
      py-12
    ">

      {/* Header */}

      <div className="mb-12">

        <h1 className="
          text-4xl
          font-black
          text-white
        ">
          Knowledge Base 📚
        </h1>

        <p className="
          text-slate-400
          mt-3
          text-lg
        ">
          Manage AI training documents,
          PDFs and websites.
        </p>

      </div>

      {loading ? (

        <div className="
          h-40
          rounded-3xl
          bg-slate-900
          border border-slate-800
          flex items-center
          justify-center
          text-slate-400
        ">

          Loading knowledge base...

        </div>

      ) : (

        <>

          {/* Stats */}

          <div className="
            grid
            md:grid-cols-3
            gap-6
            mb-10
          ">

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
                    {sources.length}
                  </h2>

                </div>

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-cyan-500/20
                  flex items-center
                  justify-center
                ">

                  <FileText
                    size={32}
                    className="
                      text-cyan-400
                    "
                  />

                </div>

              </div>

            </div>

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
                    AI Status
                  </p>

                  <h2 className="
                    text-2xl
                    font-black
                    mt-3
                    text-emerald-400
                  ">
                    Active
                  </h2>

                </div>

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-emerald-500/20
                  flex items-center
                  justify-center
                ">

                  <Database
                    size={32}
                    className="
                      text-emerald-400
                    "
                  />

                </div>

              </div>

            </div>

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
                    Storage
                  </p>

                  <h2 className="
                    text-2xl
                    font-black
                    mt-3
                    text-indigo-400
                  ">
                    Local Storage
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

          </div>

          {/* Sources */}

          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          ">

            {sources.map((source) => (

              <div

                key={source.id}

                className="
                  rounded-3xl
                  border border-slate-800
                  bg-slate-900/70
                  backdrop-blur-xl
                  p-8
                  hover:border-cyan-500/40
                  transition-all
                "
              >

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-red-500/20
                  flex items-center
                  justify-center
                  mb-6
                ">

                  <FileText
                    size={32}
                    className="
                      text-red-400
                    "
                  />

                </div>

                <h2 className="
                  text-xl
                  font-bold
                  text-white
                  break-words
                ">
                  {source.source_name}
                </h2>

                <div className="
                  mt-3
                  inline-flex
                  px-3 py-1
                  rounded-full
                  bg-cyan-500/10
                  border border-cyan-500/30
                  text-cyan-400
                  text-xs
                ">

                  {
                    source.source_type === "website"
                      ? "🌐 Website"
                      : "📄 PDF"
                  }

                </div>

                <p className="
                  text-slate-400
                  mt-4
                ">

                  Chunks Indexed:
                  {" "}
                  {source.chunks_added}

                </p>

                <div className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  px-4 py-2
                  rounded-full
                  bg-emerald-500/10
                  border border-emerald-500/30
                  text-emerald-400
                  text-sm
                ">

                  ✅ Indexed

                </div>

                <button

                  onClick={() =>
                    handleDelete(
                      source.id
                    )
                  }

                  className="
                    mt-6
                    w-full
                    px-5 py-3
                    rounded-2xl
                    bg-red-500/10
                    border border-red-500/30
                    text-red-400
                    hover:bg-red-500/20
                    transition-all
                  "
                >

                  Delete Knowledge

                </button>

                {

                  source.source_type ===
                  "website" && (

                    <button

                      onClick={() =>
                        handleReindex(
                          source.id
                        )
                      }

                      className="
                        mt-3
                        w-full
                        px-5 py-3
                        rounded-2xl
                        bg-cyan-500/10
                        border border-cyan-500/30
                        text-cyan-400
                        hover:bg-cyan-500/20
                        transition-all
                      "
                    >

                      Re-index Website

                    </button>
                  )
                }

              </div>

            ))}

          </div>

        </>

      )}

    </div>
  );
}