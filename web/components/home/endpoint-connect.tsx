"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Check, Copy, Download, Plug } from "lucide-react"
import { config } from "@/config"

const url = config.mcp.endpoint
const serverName = config.site.name
const serverDescription = config.site.description

export default function EndpointConnect() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const copyValue = useCallback(async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)

      if (copyTimer.current) clearTimeout(copyTimer.current)

      copyTimer.current = setTimeout(() => setCopiedKey(null), 1600)
    } catch {
      setCopiedKey(null)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current)
    }
  }, [])

  return (
    <div className="rise mt-8" style={{ animationDelay: "240ms" }}>
      <div className="flex overflow-hidden rounded-lg border-2 border-[#F5C518] bg-[#19170F] shadow-[4px_4px_0_#F5C518]">
        <span className="hidden w-11 shrink-0 place-items-center border-r-2 border-[#F5C518] bg-[#F5C518] text-black sm:grid">
          <Plug size={18} strokeWidth={2.4} />
        </span>

        <code className="min-w-0 flex-1 truncate px-3.5 py-3 text-sm sm:text-[15px]">
          {url}
        </code>

        <button
          onClick={() => copyValue("endpoint", url)}
          aria-label="Copy endpoint URL"
          className="flex min-h-11 w-auto min-w-20 shrink-0 items-center justify-center gap-1.5 bg-[#F5C518] px-3 text-xs font-semibold text-black transition-all hover:bg-[#FFD84A] hover:text-base focus-visible:outline focus-visible:-outline-offset-4 focus-visible:outline-black active:bg-[#E0B410] sm:w-28 sm:gap-2 sm:px-4 sm:text-sm"
        >
          {copiedKey === "endpoint" ? (
            <span className="pop flex items-center gap-1.5 whitespace-nowrap sm:gap-2">
              <Check size={16} strokeWidth={2.6} />
              Copied
            </span>
          ) : (
            <span className="flex items-center gap-1.5 whitespace-nowrap sm:gap-2">
              <Copy size={16} strokeWidth={2.4} />
              Copy
            </span>
          )}
        </button>
      </div>

      <p className="mt-3 text-sm text-[#8A8A8A]">
        Works in MCP Inspector and other clients that support Streamable HTTP.
      </p>

      <div className="mt-4 rounded-lg border border-white/10 bg-white/3 p-3 sm:p-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-[#B8B8B8]">AI client details</p>
          <a
            href="/google-calendar-icon.png"
            download="google-calendar-icon.png"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-[11px] font-medium text-[#B8B8B8] transition-colors hover:border-[#F5C518]/50 hover:text-[#F5C518] focus-visible:outline focus-visible:outline-[#F5C518]"
          >
            <Image
              src="/google-calendar-icon.png"
              alt="Google Calendar MCP"
              width={16}
              height={16}
              className="size-4 rounded-sm"
            />
            Icon
            <Download size={13} />
          </a>
        </div>

        <CopyDetail
          label="Name"
          value={serverName}
          copied={copiedKey === "name"}
          onCopy={() => copyValue("name", serverName)}
        />
        <CopyDetail
          label="Description"
          value={serverDescription}
          copied={copiedKey === "description"}
          onCopy={() => copyValue("description", serverDescription)}
        />
      </div>
    </div>
  )
}

function CopyDetail({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string
  value: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div className="flex items-start gap-2 border-t border-white/[0.07] py-2 first:border-t-0 first:pt-0 last:pb-0">
      <span className="w-18 shrink-0 pt-0.5 text-[11px] text-[#777]">
        {label}
      </span>
      <p
        title={value}
        className="min-w-0 flex-1 text-xs leading-relaxed text-[#B8B8B8] line-clamp-1"
      >
        {value}
      </p>
      <button
        onClick={onCopy}
        aria-label={`Copy server ${label.toLowerCase()}`}
        className="-mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded text-[#777] transition-colors hover:bg-white/5 hover:text-[#F5C518] focus-visible:outline focus-visible:outline-[#F5C518]"
      >
        {copied ? (
          <Check size={14} className="text-[#F5C518]" />
        ) : (
          <Copy size={13} />
        )}
      </button>
    </div>
  )
}
