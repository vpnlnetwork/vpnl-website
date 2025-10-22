import { getImageProps } from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

import type { ClassNameProp } from "@/lib/types"

import LanguageMorpher from "@/components/Homepage/LanguageMorpher"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber } from "@/lib/utils/screen"

import heroBase from "@/public/VPNLhero.png"

const HomeHero = async ({ className }: ClassNameProp) => {
  const locale = getLocale()
  const t = await getTranslations({ locale, namespace: "page-index" })

  const alt = t("page-index-hero-image-alt")

  const common = {
    alt,
    sizes: `(max-width: ${breakpointAsNumber["2xl"]}px) 100vw, ${breakpointAsNumber["2xl"]}px`,
    priority: true,
  }

  const {
    props: { srcSet: srcSetBase, blurWidth, blurHeight, ...rest },
  } = getImageProps({ ...common, ...heroBase, quality: 80 })

  return (
    <div className={cn("w-full", className)}>
      <div className="h-[240px] overflow-hidden md:h-[380px] lg:h-[480px]">
        <img {...rest} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col items-center border-t-[3px] border-primary-low-contrast px-4 pt-16 pb-10 text-center">
        <div className="flex flex-col items-center gap-y-6 lg:max-w-3xl">
          <h1 className="text-4xl font-black md:text-5xl lg:text-6xl">
            Open reputation infrastructure for intent networks
          </h1>
          <p className="max-w-2xl text-lg text-body-medium lg:text-xl">
            Measure solver performance, prove reliability, and coordinate trustlessly across rollups.
          </p>
          
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a 
              href="https://demo.vpnl.io" 
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Try Demo
            </a>
            <a 
              href="https://github.com/vpnlnetwork/vpnl" 
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary-low-contrast"
            >
              View on GitHub
            </a>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 rounded-lg border border-body-light bg-background-highlight px-4 py-3 text-sm">
            <div className="font-semibold text-body-medium">Contracts (Arbitrum Sepolia)</div>
            <a 
              href="https://sepolia.arbiscan.io/address/0xD3Acf580A28977D24da7d20364A2F557606d439A"
              className="font-mono text-primary hover:text-primary-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              0xD3Acf580A28977D24da7d20364A2F557606d439A
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
