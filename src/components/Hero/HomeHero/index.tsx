import { getImageProps } from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

import type { ClassNameProp } from "@/lib/types"

import LanguageMorpher from "@/components/Homepage/LanguageMorpher"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber } from "@/lib/utils/screen"

import heroBase from "@/public/images/heroimage.png"
import { ParallaxHeroContent } from "./ParallaxHeroContent"

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
    props: { srcSet: srcSetBase, ...rest },
  } = getImageProps({ ...common, ...heroBase, quality: 80 })

  return (
    <div className={cn("w-full", className)}>
      <div className="h-[360px] overflow-hidden md:h-[500px] lg:h-[600px]">
        <img {...rest} alt={alt} className="h-full w-full object-cover object-bottom" />
      </div>
      <ParallaxHeroContent>
        <h1 className="text-4xl font-black md:text-5xl lg:text-6xl">
          Verifiable Performance Network Layer
        </h1>
        <p className="max-w-2xl text-lg text-body-medium lg:text-xl">
          Open reputation infrastructure for intent networks. Measure solver performance, prove reliability, and coordinate trustlessly across rollups.
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
      </ParallaxHeroContent>
    </div>
  )
}

export default HomeHero
