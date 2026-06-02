import Link from "next/link";

export default function HomePage() {

  return (

    <main className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-slate-950
      text-white
      overflow-hidden
    ">

      {/* Background Glow */}
      <div className="
        absolute top-0 left-0
        w-[500px] h-[500px]
        bg-cyan-500/20
        blur-[120px]
        rounded-full
      " />

      <div className="
        absolute bottom-0 right-0
        w-[500px] h-[500px]
        bg-indigo-500/20
        blur-[120px]
        rounded-full
      " />

      {/* Navbar */}
      <nav className="
        relative z-10
        flex items-center justify-between
        px-10 py-6
        border-b border-slate-800
      ">

        {/* Logo */}
        <div>

          <h1 className="
            text-3xl font-bold
            bg-gradient-to-r
            from-cyan-400
            to-indigo-500
            bg-clip-text
            text-transparent
          ">
            CustomerAssist AI
          </h1>

          <p className="
            text-slate-400 text-sm mt-1
          ">
            AI Receptionist SaaS
          </p>

        </div>

        {/* Nav Buttons */}
        <div className="
          flex items-center gap-4
        ">

          <Link
            href="/dashboard"
            className="
              px-6 py-3
              rounded-2xl
              border border-slate-700
              hover:border-cyan-500
              transition-all
            "
          >
            Dashboard
          </Link>

          <Link
            href="/login"
            className="
              px-6 py-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-indigo-500
              hover:scale-105
              transition-all
              shadow-lg shadow-cyan-500/20
            "
          >
            Get Started
          </Link>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="
        relative z-10
        px-10 py-24
        max-w-7xl mx-auto
        grid lg:grid-cols-2
        gap-20
        items-center
      ">

        {/* Left Content */}
        <div>

          <div className="
            inline-flex items-center
            gap-2
            px-4 py-2
            rounded-full
            border border-cyan-500/30
            bg-cyan-500/10
            text-cyan-300
            text-sm
            mb-8
          ">

            🚀 AI-Powered Customer Support Platform

          </div>

          <h1 className="
            text-6xl
            font-black
            leading-tight
          ">

            Automate
            <span className="
              bg-gradient-to-r
              from-cyan-400
              to-indigo-500
              bg-clip-text
              text-transparent
            ">
              {" "}WhatsApp{" "}
            </span>

            Customer Support
          </h1>

          <p className="
            text-slate-400
            text-xl
            mt-8
            leading-relaxed
            max-w-2xl
          ">

            Build AI-powered customer support systems using
            WhatsApp, RAG knowledge bases, analytics dashboards,
            and real-time conversation management.

          </p>

          {/* Buttons */}
          <div className="
            flex items-center gap-5
            mt-10
          ">

            <Link
              href="/dashboard"
              className="
                px-8 py-4
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-indigo-500
                hover:scale-105
                transition-all
                shadow-2xl shadow-cyan-500/30
                font-semibold
              "
            >
              Launch Dashboard
            </Link>

            <button className="
              px-8 py-4
              rounded-2xl
              border border-slate-700
              hover:border-cyan-500
              transition-all
            ">
              Watch Demo
            </button>

          </div>

          {/* Stats */}
          <div className="
            flex gap-10
            mt-16
          ">

            <div>

              <h2 className="
                text-4xl font-bold
              ">
                24/7
              </h2>

              <p className="
                text-slate-400 mt-2
              ">
                AI Support
              </p>

            </div>

            <div>

              <h2 className="
                text-4xl font-bold
              ">
                99%
              </h2>

              <p className="
                text-slate-400 mt-2
              ">
                Faster Responses
              </p>

            </div>

            <div>

              <h2 className="
                text-4xl font-bold
              ">
                RAG
              </h2>

              <p className="
                text-slate-400 mt-2
              ">
                Powered AI
              </p>

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="
          relative
        ">

          <div className="
            rounded-[32px]
            border border-slate-800
            bg-slate-900/70
            backdrop-blur-xl
            p-8
            shadow-2xl
          ">

            {/* Fake Chat UI */}
            <div className="
              space-y-5
            ">

              <div className="
                flex justify-start
              ">

                <div className="
                  bg-slate-800
                  px-5 py-4
                  rounded-3xl
                  max-w-sm
                ">
                  Hello! I need pricing details.
                </div>

              </div>

              <div className="
                flex justify-end
              ">

                <div className="
                  bg-cyan-500
                  text-black
                  px-5 py-4
                  rounded-3xl
                  max-w-sm
                ">
                  Sure! Our AI solutions start from enterprise-ready scalable plans.
                </div>

              </div>

              <div className="
                flex justify-start
              ">

                <div className="
                  bg-slate-800
                  px-5 py-4
                  rounded-3xl
                  max-w-sm
                ">
                  Can I upload PDFs for chatbot training?
                </div>

              </div>

              <div className="
                flex justify-end
              ">

                <div className="
                  bg-indigo-500
                  px-5 py-4
                  rounded-3xl
                  max-w-sm
                ">
                  Absolutely! Our RAG pipeline supports PDFs, websites, and knowledge bases.
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
{/* Features Section */}
<section className="
  relative z-10
  px-10 pb-32
  max-w-7xl mx-auto
">

  {/* Heading */}
  <div className="
    text-center
    mb-20
  ">

    <h2 className="
      text-5xl font-black
    ">
      Powerful AI Support Features
    </h2>

    <p className="
      text-slate-400
      text-xl
      mt-6
      max-w-3xl mx-auto
    ">

      Everything you need to build
      enterprise-grade AI customer support systems.

    </p>

  </div>

  {/* Cards */}
  <div className="
    grid
    md:grid-cols-2
    lg:grid-cols-3
    gap-8
  ">

    {/* Card */}
    <div className="
      rounded-3xl
      border border-slate-800
      bg-slate-900/70
      backdrop-blur-xl
      p-8
      hover:border-cyan-500/50
      transition-all
      hover:-translate-y-2
    ">

      <div className="
        w-16 h-16
        rounded-2xl
        bg-cyan-500/20
        flex items-center justify-center
        text-3xl
        mb-6
      ">
        💬
      </div>

      <h3 className="
        text-2xl font-bold
      ">
        WhatsApp AI Chat
      </h3>

      <p className="
        text-slate-400
        mt-4
        leading-relaxed
      ">

        Automate customer conversations
        directly through WhatsApp using
        AI-powered responses.

      </p>

    </div>

    {/* Card */}
    <div className="
      rounded-3xl
      border border-slate-800
      bg-slate-900/70
      backdrop-blur-xl
      p-8
      hover:border-indigo-500/50
      transition-all
      hover:-translate-y-2
    ">

      <div className="
        w-16 h-16
        rounded-2xl
        bg-indigo-500/20
        flex items-center justify-center
        text-3xl
        mb-6
      ">
        🧠
      </div>

      <h3 className="
        text-2xl font-bold
      ">
        RAG Knowledge Base
      </h3>

      <p className="
        text-slate-400
        mt-4
        leading-relaxed
      ">

        Train AI assistants using PDFs,
        websites, documents, and
        enterprise knowledge bases.

      </p>

    </div>

    {/* Card */}
    <div className="
      rounded-3xl
      border border-slate-800
      bg-slate-900/70
      backdrop-blur-xl
      p-8
      hover:border-emerald-500/50
      transition-all
      hover:-translate-y-2
    ">

      <div className="
        w-16 h-16
        rounded-2xl
        bg-emerald-500/20
        flex items-center justify-center
        text-3xl
        mb-6
      ">
        📊
      </div>

      <h3 className="
        text-2xl font-bold
      ">
        Real-Time Analytics
      </h3>

      <p className="
        text-slate-400
        mt-4
        leading-relaxed
      ">

        Monitor customer activity,
        conversations, response trends,
        and AI engagement live.

      </p>

    </div>

    {/* Card */}
    <div className="
      rounded-3xl
      border border-slate-800
      bg-slate-900/70
      backdrop-blur-xl
      p-8
      hover:border-pink-500/50
      transition-all
      hover:-translate-y-2
    ">

      <div className="
        w-16 h-16
        rounded-2xl
        bg-pink-500/20
        flex items-center justify-center
        text-3xl
        mb-6
      ">
        🗂️
      </div>

      <h3 className="
        text-2xl font-bold
      ">
        Conversation Storage
      </h3>

      <p className="
        text-slate-400
        mt-4
        leading-relaxed
      ">

        Store and manage every customer
        interaction using PostgreSQL
        conversation history.

      </p>

    </div>

    {/* Card */}
    <div className="
      rounded-3xl
      border border-slate-800
      bg-slate-900/70
      backdrop-blur-xl
      p-8
      hover:border-yellow-500/50
      transition-all
      hover:-translate-y-2
    ">

      <div className="
        w-16 h-16
        rounded-2xl
        bg-yellow-500/20
        flex items-center justify-center
        text-3xl
        mb-6
      ">
        🌐
      </div>

      <h3 className="
        text-2xl font-bold
      ">
        Website Scraping
      </h3>

      <p className="
        text-slate-400
        mt-4
        leading-relaxed
      ">

        Automatically ingest website
        content into your AI knowledge
        base pipeline.

      </p>

    </div>

    {/* Card */}
    <div className="
      rounded-3xl
      border border-slate-800
      bg-slate-900/70
      backdrop-blur-xl
      p-8
      hover:border-purple-500/50
      transition-all
      hover:-translate-y-2
    ">

      <div className="
        w-16 h-16
        rounded-2xl
        bg-purple-500/20
        flex items-center justify-center
        text-3xl
        mb-6
      ">
        🏢
      </div>

      <h3 className="
        text-2xl font-bold
      ">
        Multi-Company SaaS
      </h3>

      <p className="
        text-slate-400
        mt-4
        leading-relaxed
      ">

        Support multiple businesses
        with isolated AI knowledge,
        analytics, and dashboards.

      </p>

    </div>

  </div>

</section>
    </main>
  );
}