"use client"

import { cn } from "@/lib/utils/cn"

interface ParallaxHeroContentProps {
  children: React.ReactNode
}

export const ParallaxHeroContent = ({ children }: ParallaxHeroContentProps) => {
  return (
    <div className="relative -mt-32 flex flex-col items-center px-4 pb-10 text-center md:-mt-40 lg:-mt-48">
      <div className="flex flex-col items-center gap-y-6 rounded-2xl bg-background/95 px-6 py-8 shadow-lg backdrop-blur-sm lg:max-w-3xl lg:px-8 lg:py-10">
        {children}
      </div>
    </div>
  )
}
