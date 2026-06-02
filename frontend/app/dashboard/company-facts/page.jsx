"use client";

import { useState } from "react";

import api from "@/services/api";

export default function CompanyFactsPage() {

  const [ceo, setCeo] =
    useState("");

  const [founder, setFounder] =
    useState("");

  const [headquarters,
    setHeadquarters] =
    useState("");

  const [supportEmail,
    setSupportEmail] =
    useState("");

  const [phone,
    setPhone] =
    useState("");

    const [linkedinUrl,
  setLinkedinUrl] =
  useState("");

  async function saveFacts() {

    await api.post(

  "/company-facts",

  {

    ceo,

    founder,

    headquarters,

    support_email:
      supportEmail,

    phone,

    linkedin_url:
      linkedinUrl
  }
);

    alert(
      "Facts Saved!"
    );
  }

  return (

    <div className="
      max-w-3xl
      mx-auto
      py-12
    ">

      <h1 className="
        text-4xl font-black
        text-white
        mb-10
      ">

        Company Facts

      </h1>

      <div className="
        space-y-6
      ">

        <input

          placeholder="CEO"

          value={ceo}

          onChange={(e)=>
            setCeo(
              e.target.value
            )
          }

          className="
            w-full
            p-4
            rounded-xl
            bg-slate-900
            text-white
          "
        />

        <input

          placeholder="Founder"

          value={founder}

          onChange={(e)=>
            setFounder(
              e.target.value
            )
          }

          className="
            w-full
            p-4
            rounded-xl
            bg-slate-900
            text-white
          "
        />

        <input

          placeholder="Headquarters"

          value={headquarters}

          onChange={(e)=>
            setHeadquarters(
              e.target.value
            )
          }

          className="
            w-full
            p-4
            rounded-xl
            bg-slate-900
            text-white
          "
        />

        <input

          placeholder="Support Email"

          value={supportEmail}

          onChange={(e)=>
            setSupportEmail(
              e.target.value
            )
          }

          className="
            w-full
            p-4
            rounded-xl
            bg-slate-900
            text-white
          "
        />

        <input

          placeholder="Phone"

          value={phone}

          onChange={(e)=>
            setPhone(
              e.target.value
            )
          }

          className="
            w-full
            p-4
            rounded-xl
            bg-slate-900
            text-white
          "
        />
<input

  placeholder="LinkedIn URL"

  value={linkedinUrl}

  onChange={(e)=>
    setLinkedinUrl(
      e.target.value
    )
  }

  className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    text-white
  "
/>
        <button

          onClick={saveFacts}

          className="
            w-full
            py-4
            rounded-xl
            bg-cyan-500
            text-white
            font-bold
          "
        >

          Save Facts

        </button>

      </div>

    </div>
  );
}