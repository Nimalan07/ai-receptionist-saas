"use client";

import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import api from "@/services/api";

export default function ChatWidget() {

  const [open, setOpen] =
    useState(false);

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function askAI() {

    if (!question.trim()) return;

    const userMsg = {

      role: "user",

      content: question
    };

    setMessages(prev => [

      ...prev,

      userMsg
    ]);

    const currentQuestion =
      question;

    setQuestion("");

    try {

      setLoading(true);

      const response =
        await api.post(

          "/playground/chat",

          {
            question:
              currentQuestion
          }
        );

     setMessages(prev => [

  ...prev,

  {

    role: "assistant",

    content:
      response.data.answer,

    sources:
      response.data.sources || []
  }
]);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  }

  return (

    <>
      {/* Floating Button */}

      {!open && (

        <button

          onClick={() =>
            setOpen(true)
          }

          className="
            fixed
            bottom-6
            right-6
            z-50

            w-16
            h-16

            rounded-full

            bg-gradient-to-r
            from-cyan-500
            to-indigo-500

            shadow-2xl

            flex
            items-center
            justify-center

            hover:scale-110

            transition-all
          "
        >

          <Bot
            className="
              text-white
            "
            size={30}
          />

        </button>
      )}

      {/* Chat Window */}

      {open && (

        <div

          className="
            fixed

            bottom-6
            right-6

            z-50

            w-[380px]
            h-[600px]

            rounded-3xl

            border
            border-slate-800

            bg-slate-950

            shadow-2xl

            flex
            flex-col
          "
        >

          {/* Header */}

          <div className="
            p-5

            border-b
            border-slate-800

            flex
            items-center
            justify-between
          ">

            <div>

              <h3 className="
                text-white
                font-bold
              ">

                AI Assistant 🤖

              </h3>

              <p className="
                text-slate-400
                text-sm
              ">

                Powered by RAG

              </p>

            </div>

            <button

              onClick={() =>
                setOpen(false)
              }

            >

              <X
                className="
                  text-slate-400
                "
              />

            </button>

          </div>

          {/* Messages */}

          <div className="
            flex-1

            overflow-y-auto

            p-4

            space-y-4
          ">

            {messages.map(

  (msg, index) => (

    <div

      key={index}

      className={`

        px-4 py-3

        rounded-2xl

        max-w-[90%]

        ${msg.role === "user"

          ? `
            ml-auto
            bg-cyan-500
            text-white
          `

          : `
            bg-slate-800
            text-slate-200
          `
        }
      `}
    >

      {msg.content}

      {

        msg.role === "assistant"

        &&

        msg.sources?.length > 0 && (

          <div className="
            mt-3
            pt-3
            border-t
            border-slate-700
            text-xs
            text-slate-400
          ">

            <div className="
              mb-2
              font-semibold
            ">

              Sources

            </div>

            {

              msg.sources.map(

                (
                  source,
                  sourceIndex
                ) => (

                  <div
                    key={sourceIndex}
                  >

                    {

                      source.includes(
                        "http"
                      )

                      ? "🌐 "

                      : "📄 "
                    }

                    {source}

                  </div>
                )
              )
            }

          </div>
        )
      }

    </div>
  )
)}

            {loading && (

              <div className="
                text-slate-400
              ">

                Thinking...

              </div>
            )}

          </div>

          {/* Input */}

          <div className="
            p-4

            border-t
            border-slate-800

            flex
            gap-2
          ">

            <input

              value={question}

              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }

              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {

                  askAI();
                }
              }}

              placeholder="
                Ask something...
              "

              className="
                flex-1

                px-4 py-3

                rounded-xl

                bg-slate-900

                border
                border-slate-700

                text-white
              "
            />

            <button

              onClick={askAI}

              className="
                px-4

                rounded-xl

                bg-cyan-500

                text-white
              "
            >

              <Send size={18} />

            </button>

          </div>

        </div>
      )}

    </>
  );
}