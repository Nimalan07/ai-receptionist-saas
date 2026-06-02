"use client";

import { Bell, Search } from "lucide-react";

import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
function handleLogout() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  router.push("/login");
}
  return (
    <header className="
      h-20
      border-b border-slate-800
      bg-slate-900/70
      backdrop-blur-xl
      flex items-center justify-between
      px-6
    ">

      {/* Left */}
      <div>

        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-slate-400 text-sm">
          Monitor conversations and analytics
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="
          flex items-center gap-2
          bg-slate-800
          px-4 py-2
          rounded-xl
          border border-slate-700
        ">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="
              bg-transparent
              outline-none
              text-sm
              placeholder:text-slate-500
            "
          />

        </div>

        {/* Notification */}
        <button className="
          w-11 h-11
          rounded-xl
          bg-slate-800
          border border-slate-700
          flex items-center justify-center
          hover:bg-slate-700
          transition
        ">
          <Bell size={20} />
        </button>

      </div>
<button

  onClick={handleLogout}

  className="
    px-5 py-3
    rounded-2xl
    bg-red-500/10
    border border-red-500/30
    text-red-400
    hover:bg-red-500/20
    transition-all
  "
>

  Logout

</button>
    </header>
  );
}