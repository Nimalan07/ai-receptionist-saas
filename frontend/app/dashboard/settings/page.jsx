"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";
import { useTheme } from "next-themes";
export default function SettingsPage() {

  const [companyName, setCompanyName] =
    useState("");
  const [assistantName, setAssistantName] =
  useState("");

const [welcomeMessage, setWelcomeMessage] =
  useState("");

const [autoReply, setAutoReply] =
  useState(true);
  const [darkMode, setDarkMode] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);
  const { theme, setTheme } =
    useTheme();
  // Load settings
  useEffect(() => {

    const fetchSettings =
      async () => {

      try {

        const response =
          await api.get(
            "/dashboard/settings"
          );

        setCompanyName(
          response.data.company_name
        );
        setAssistantName(
  response.data.assistant_name
);

        setWelcomeMessage(
  response.data.welcome_message
);

        setAutoReply(
  response.data.auto_reply === "true"
);
        setDarkMode(
          response.data.dark_mode === "true"
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchSettings();

  }, []);

  // Save settings
  const handleSave = async () => {

    try {

      setSaving(true);

      await api.post(
        "/dashboard/settings",
       {
  company_name:
    companyName,

  assistant_name:
    assistantName,

  welcome_message:
    welcomeMessage,

  auto_reply:
    autoReply.toString(),

  dark_mode:
    darkMode.toString()
}
      );

      alert(
        "Settings saved successfully!"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to save settings"
      );

    } finally {

      setSaving(false);
    }
  };

  if (loading) {

    return (

      <div className="
        text-slate-400
      ">
        Loading settings...
      </div>
    );
  }

  return (

    <div className="
      max-w-3xl
    ">

      {/* Header */}
      <div className="mb-8">

        <h1 className="
          text-4xl font-bold
        ">
          Settings ⚙️
        </h1>

        <p className="
          text-slate-400 mt-2
        ">
          Manage your AI assistant configuration.
        </p>

      </div>

      {/* Settings Card */}
      <div className="
        rounded-3xl
        border border-slate-800
        bg-slate-900/60
        p-8
        space-y-8
      ">

        {/* Company Name */}
        <div>

          <label className="
            block text-sm
            text-slate-400 mb-3
          ">
            Company Name
          </label>

          <input
            type="text"

            value={companyName}

            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }

            className="
              w-full
              rounded-2xl
              bg-slate-800
              border border-slate-700
              px-5 py-4
              outline-none
            "
          />

        </div>
{/* Assistant Name */}
<div>

  <label className="
    block text-sm
    text-slate-400 mb-3
  ">
    Assistant Name
  </label>

  <input
    type="text"

    value={assistantName}

    onChange={(e) =>
      setAssistantName(
        e.target.value
      )
    }

    className="
      w-full
      rounded-2xl
      bg-slate-800
      border border-slate-700
      px-5 py-4
      outline-none
    "
  />

</div>
{/* Welcome Message */}
<div>

  <label className="
    block text-sm
    text-slate-400 mb-3
  ">
    Welcome Message
  </label>

  <textarea

    value={welcomeMessage}

    onChange={(e) =>
      setWelcomeMessage(
        e.target.value
      )
    }

    rows={4}

    className="
      w-full
      rounded-2xl
      bg-slate-800
      border border-slate-700
      px-5 py-4
      outline-none
      resize-none
    "
  />

</div>
        {/* Dark Mode */}
        <div className="
          flex items-center justify-between
        ">

          <div>

            <h3 className="
              font-semibold
            ">
              Dark Mode
            </h3>

            <p className="
              text-sm text-slate-400 mt-1
            ">
              Enable dark theme for dashboard.
            </p>

          </div>

          <button
onClick={() => {

  const newMode = !darkMode;

  setDarkMode(newMode);

  setTheme(
    newMode ? "dark" : "light"
  );
}}
            className={`
              w-16 h-9
              rounded-full
              transition-all

              ${
                darkMode
                  ? "bg-cyan-500"
                  : "bg-slate-700"
              }
            `}
          >

            <div className={`
              w-7 h-7
              bg-white
              rounded-full
              transition-all

              ${
                darkMode
                  ? "translate-x-8"
                  : "translate-x-1"
              }
            `} />

          </button>

        </div>
{/* Auto Reply */}
<div className="
  flex items-center justify-between
">

  <div>

    <h3 className="
      font-semibold
    ">
      Auto Reply
    </h3>

    <p className="
      text-sm text-slate-400 mt-1
    ">
      Automatically respond to customers.
    </p>

  </div>

  <button

    onClick={() =>
      setAutoReply(!autoReply)
    }

    className={`
      w-16 h-9
      rounded-full
      transition-all

      ${
        autoReply
          ? "bg-cyan-500"
          : "bg-slate-700"
      }
    `}
  >

    <div className={`
      w-7 h-7
      bg-white
      rounded-full
      transition-all

      ${
        autoReply
          ? "translate-x-8"
          : "translate-x-1"
      }
    `} />

  </button>

</div>
        {/* Save Button */}
        <button

          onClick={handleSave}

          disabled={saving}

          className="
            px-6 py-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500 to-indigo-500
            font-semibold
            shadow-lg
          "
        >

          {
            saving
              ? "Saving..."
              : "Save Settings"
          }

        </button>

      </div>

    </div>
  );
}