"use client";
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { loginUser }
from "@/services/auth";


export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleLogin(e) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const data = await loginUser(
        email,
        password
      );

      // Save JWT
      localStorage.setItem(
        "token",
        data.access_token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Redirect
      router.push("/dashboard");

    } catch (err) {

      setError(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <main className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-slate-950
      flex items-center justify-center
      px-6
    ">

      <div className="
        w-full max-w-md
        rounded-[32px]
        border border-slate-800
        bg-slate-900/70
        backdrop-blur-xl
        p-10
        shadow-2xl
      ">
<Link

  href="/"

  className="
    inline-flex items-center
    gap-2
    text-slate-400
    hover:text-cyan-400
    transition-all
    mb-8
  "
>

  ← Back to Home

</Link>
        {/* Logo */}
        <div className="
          text-center mb-10
        ">

          <h1 className="
            text-4xl font-black
            text-white
          ">
            CustomerAssist AI
          </h1>

          <p className="
            text-slate-400 mt-3
          ">
            Login to your AI dashboard
          </p>

        </div>

        {/* Error */}
        {error && (

          <div className="
            mb-6
            rounded-2xl
            bg-red-500/10
            border border-red-500/30
            text-red-400
            px-4 py-3
            text-sm
          ">

            {error}

          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="
            space-y-6
          "
        >

          {/* Email */}
          <div>

            <label className="
              block text-sm
              text-slate-400 mb-3
            ">
              Email
            </label>

            <input
              type="email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              required

              className="
                w-full
                rounded-2xl
                bg-slate-800
                border border-slate-700
                px-5 py-4
                text-white
                outline-none
              "
            />

          </div>

          {/* Password */}
          <div>

            <label className="
              block text-sm
              text-slate-400 mb-3
            ">
              Password
            </label>

            <input
              type="password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              required

              className="
                w-full
                rounded-2xl
                bg-slate-800
                border border-slate-700
                px-5 py-4
                text-white
                outline-none
              "
            />

          </div>

          {/* Button */}
          <button

            type="submit"

            disabled={loading}

            className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-indigo-500
              py-4
              font-semibold
              text-white
              hover:scale-[1.02]
              transition-all
            "
          >

            {
              loading
                ? "Signing in..."
                : "Sign In"
            }

          </button>

        </form>

      </div>

    </main>
  );
}