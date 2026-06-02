"use client";

import { useState } from "react";

import api from "@/services/api";


export default function UploadPage() {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");
 
  const [websiteUrl, setWebsiteUrl] =
  useState("");

const [websiteLoading,
  setWebsiteLoading] =
  useState(false);

const [websiteSuccess,
  setWebsiteSuccess] =
  useState("");

const [websiteError,
  setWebsiteError] =
  useState("");
  async function handleUpload() {

  if (!file) {

    alert("Please select a PDF");

    return;
  }

  try {

    setLoading(true);

    setSuccess("");

    setError("");

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    console.log("Sending request...");

    const response =
      await api.post(

        "/upload/pdf",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    console.log(response.data);

    setSuccess(

      `PDF uploaded successfully! ${response.data.chunks_added} chunks added.`
    );

  } catch (err) {

    console.error(err);

    setError(
      "Upload failed."
    );

  } finally {

    setLoading(false);
  }
}
async function handleWebsiteIngestion() {

  if (!websiteUrl) return;

  try {

    setWebsiteLoading(true);

    setWebsiteSuccess("");

    setWebsiteError("");

    const response =
      await api.post(

        "/web-ingestion/",

        {
          url: websiteUrl
        }
      );

    setWebsiteSuccess(

      `Website ingested successfully! ${response.data.chunks_added} chunks added.`
    );

    setWebsiteUrl("");

  } catch (err) {

    console.error(err);

    setWebsiteError(
      "Website ingestion failed."
    );

  } finally {

    setWebsiteLoading(false);
  }
}
  return (

    <div className="
      max-w-4xl
      mx-auto
      py-12
    ">

      {/* Heading */}
      <div className="
        mb-10
      ">

        <h1 className="
          text-4xl font-black
          text-white
        ">
          Upload Knowledge Base 📄
        </h1>

        <p className="
          text-slate-400
          mt-3
          text-lg
        ">
          Upload PDFs to train your AI assistant.
        </p>

      </div>

      {/* Upload Card */}
      <div className="
        rounded-[32px]
        border border-slate-800
        bg-slate-900/70
        backdrop-blur-xl
        p-10
        shadow-2xl
      ">

        {/* Upload Area */}
        <div className="
          border-2
          border-dashed
          border-slate-700
          rounded-3xl
          p-16
          text-center
        ">

          <div className="
            text-6xl mb-6
          ">
            📄
          </div>

          <h2 className="
            text-2xl font-bold
            text-white
          ">
            Upload PDF Files
          </h2>

          <p className="
            text-slate-400
            mt-3
          ">
            AI will automatically process
            and learn from uploaded PDFs.
          </p>

          {/* File Input */}
          <input

            type="file"

            accept=".pdf"

            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }

            className="
              mt-8
              block
              mx-auto
              text-slate-300
            "
          />

          {/* File Name */}
          {file && (

            <p className="
              mt-5
              text-cyan-400
            ">

              Selected:
              {" "}
              {file.name}

            </p>
          )}

          {/* Upload Button */}
          <button

  type="button"

  onClick={() => {

    console.log("UPLOAD CLICKED");

    handleUpload();
  }}

  disabled={loading}

  className="
    mt-8
    px-8 py-4
    rounded-2xl
    bg-gradient-to-r
    from-cyan-500
    to-indigo-500
    hover:scale-105
    transition-all
    text-white
    font-semibold
    shadow-xl
    disabled:opacity-50
  "
>

  {
    loading
      ? "Uploading..."
      : "Upload PDF"
  }

</button>
          {/* Success */}
          {success && (

            <div className="
              mt-8
              rounded-2xl
              bg-emerald-500/10
              border border-emerald-500/30
              text-emerald-400
              px-5 py-4
            ">

              {success}

            </div>
          )}

          {/* Error */}
          {error && (

            <div className="
              mt-8
              rounded-2xl
              bg-red-500/10
              border border-red-500/30
              text-red-400
              px-5 py-4
            ">

              {error}

            </div>
          )}

        </div>

      </div>
          {/* WEBSITE INGESTION */}

<div className="
  mt-12
  rounded-[32px]
  border border-slate-800
  bg-slate-900/70
  backdrop-blur-xl
  p-10
  shadow-2xl
">

  <div className="
    mb-8
  ">

    <h2 className="
      text-3xl font-black
      text-white
    ">

      Website Knowledge 🌐

    </h2>

    <p className="
      text-slate-400
      mt-3
    ">

      Paste a company website URL
      to train your AI assistant.

    </p>

  </div>

  {/* URL Input */}
  <input

    type="text"

    placeholder="
      https://company.com
    "

    value={websiteUrl}

    onChange={(e) =>
      setWebsiteUrl(
        e.target.value
      )
    }

    className="
      w-full
      px-6 py-5
      rounded-2xl
      bg-slate-950
      border border-slate-700
      text-white
      outline-none
      focus:border-cyan-500
      transition-all
    "
  />

  {/* Button */}
  <button

    onClick={
      handleWebsiteIngestion
    }

    disabled={websiteLoading}

    className="
      mt-6
      px-8 py-4
      rounded-2xl
      bg-gradient-to-r
      from-emerald-500
      to-cyan-500
      hover:scale-105
      transition-all
      text-white
      font-semibold
      shadow-xl
    "
  >

    {
      websiteLoading
        ? "Scraping Website..."
        : "Scrape Website"
    }

  </button>

  {/* Success */}
  {websiteSuccess && (

    <div className="
      mt-8
      rounded-2xl
      bg-emerald-500/10
      border border-emerald-500/30
      text-emerald-400
      px-5 py-4
    ">

      {websiteSuccess}

    </div>
  )}

  {/* Error */}
  {websiteError && (

    <div className="
      mt-8
      rounded-2xl
      bg-red-500/10
      border border-red-500/30
      text-red-400
      px-5 py-4
    ">

      {websiteError}

    </div>
  )}

</div>
    </div>
  );
}