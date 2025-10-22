import type { StaticImageData } from "next/image"
import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import SolverImage from "@/public/images/solver.png"
import RiskImage from "@/public/images/risk.png"
import ReputationImage from "@/public/images/reputation.png"
import BuilderImage from "@/public/images/builder.png"
import ProofsImage from "@/public/images/proofs.png"

type Breakpoint = "mobile" | "lg" | "xl"
type Direction = "down" | "up" | "right" | "left"
type Color = "primary" | "accent-a" | "accent-b" | "accent-c"
type Category = "stablecoins" | "defi" | "dapps" | "networks" | "assets"
type CopyDetails = {
  title: string
  children: string
  action: string
  href: string
  eventName: Category
}
export type BentoItem = CopyDetails & {
  imgSrc: StaticImageData
  imgWidth?: number
  className: string
}

const gradientStops = "from-20% to-60%"

const colorOptions: Record<Color, string> = {
  primary: cn(
    gradientStops,
    "from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/10"
  ),
  "accent-a": cn(
    gradientStops,
    "from-accent-a/10 to-accent-a/5 dark:from-accent-a/20 dark:to-accent-a/10 border-accent-a/10"
  ),
  "accent-b": cn(
    gradientStops,
    "from-accent-b/10 to-accent-b/5 dark:from-accent-b/20 dark:to-accent-b/10 border-accent-b/10"
  ),
  "accent-c": cn(
    gradientStops,
    "from-accent-c/10 to-accent-c/5 dark:from-accent-c/20 dark:to-accent-c/10 border-accent-c/10"
  ),
}

const flow: Record<Breakpoint, Record<Direction, string>> = {
  mobile: {
    down: "flex-col bg-gradient-to-b",
    up: "flex-col-reverse bg-gradient-to-t",
    right: "flex-row bg-gradient-to-r",
    left: "flex-row-reverse bg-gradient-to-l",
  },
  lg: {
    down: "lg:flex-col lg:bg-gradient-to-b",
    up: "lg:flex-col-reverse lg:bg-gradient-to-t",
    right: "lg:flex-row lg:bg-gradient-to-r",
    left: "lg:flex-row-reverse lg:bg-gradient-to-l",
  },
  xl: {
    down: "xl:flex-col xl:bg-gradient-to-b",
    up: "xl:flex-col-reverse xl:bg-gradient-to-t",
    right: "xl:flex-row xl:bg-gradient-to-r",
    left: "xl:flex-row-reverse xl:bg-gradient-to-l",
  },
}

const stylesByPosition: Record<Breakpoint, string[]> = {
  mobile: [
    flow.mobile.down,
    flow.mobile.down,
    flow.mobile.down,
    flow.mobile.down,
    flow.mobile.down,
  ],
  lg: [
    cn("lg:col-span-6 lg:row-start-2", flow.lg.up),
    cn("lg:col-span-6 lg:col-start-7 lg:row-start-2", flow.lg.down),
    cn("lg:col-span-12 lg:row-start-3", flow.lg.right),
    cn("lg:col-span-6 lg:col-start-7 lg:row-start-4", flow.lg.up),
    cn("lg:col-span-6 lg:row-start-4", flow.lg.down),
  ],
  xl: [
    cn("xl:col-span-7 xl:col-start-5 xl:row-start-1", flow.xl.right),
    cn("xl:col-span-4 xl:col-start-2 xl:row-start-2", flow.xl.up),
    cn("xl:col-span-3 xl:col-start-6 xl:row-start-2", flow.xl.down),
    cn("xl:col-span-3 xl:col-start-9 xl:row-span-2 xl:row-start-2", flow.xl.up),
    cn("xl:col-span-7 xl:col-start-2 xl:row-start-3", flow.xl.right),
  ],
}

const getPosition = (position: number): string =>
  cn(
    stylesByPosition.mobile[position],
    stylesByPosition.lg[position],
    stylesByPosition.xl[position]
  )

export const getBentoBoxItems = async (locale: Lang): Promise<BentoItem[]> => {
  const t = await getTranslations({ locale, namespace: "page-index" })

  const getCopy = (category: Category, href: string): CopyDetails => ({
    title: t(`page-index-bento-${category}-title`),
    children: t(`page-index-bento-${category}-content`),
    action: t(`page-index-bento-${category}-action`),
    href,
    eventName: category,
  })

  return [
    {
      ...getCopy("stablecoins", "https://demo.vpnl.io"),
      imgSrc: SolverImage,
      className: cn(colorOptions["primary"], getPosition(0)),
    },
    {
      ...getCopy("defi", "https://github.com/vpnlnetwork/vpnl#readme"),
      imgSrc: RiskImage,
      imgWidth: 400,
      className: cn(colorOptions["accent-c"], getPosition(1)),
    },
    {
      ...getCopy("networks", "https://paragraph.com/@vpnl/vpnl-partners-with-dia-lumina-to-accelerate-decentralized-reputation-infrastructure"),
      imgSrc: ReputationImage,
      imgWidth: 320,
      className: cn(colorOptions["accent-b"], getPosition(2)),
    },
    {
      ...getCopy("dapps", "https://github.com/vpnlnetwork/vpnl"),
      imgSrc: BuilderImage,
      imgWidth: 324,
      className: cn(colorOptions["accent-a"], getPosition(3)),
    },
    {
      ...getCopy("assets", "https://sepolia.arbiscan.io/address/0xD3Acf580A28977D24da7d20364A2F557606d439A"),
      imgSrc: ProofsImage,
      imgWidth: 324,
      className: cn(colorOptions["primary"], getPosition(4)),
    },
  ]
}
