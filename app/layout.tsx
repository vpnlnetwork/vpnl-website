import { ReactNode } from "react"
import type { Metadata } from "next"
import * as Sentry from "@sentry/nextjs"

import "@/styles/global.css"

type Props = {
  children: ReactNode
}

// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children
}

// Sentry trace data + VPNL metadata
export function generateMetadata(): Metadata {
  return {
    title: {
      default: "VPNL — Verifiable Performance Network Layer",
      template: "%s | VPNL"
    },
    description: "A permissionless, privacy-first VPN network built on Arbitrum. Try the demo, explore the contracts, and join the community.",
    openGraph: {
      title: "VPNL — Verifiable Performance Network Layer",
      description: "A permissionless, privacy-first VPN network built on Arbitrum.",
      images: ["/og-image.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "VPNL — Verifiable Performance Network Layer",
      description: "A permissionless, privacy-first VPN network built on Arbitrum.",
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/icon-180.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    other: {
      ...Sentry.getTraceData(),
    },
  }
}
