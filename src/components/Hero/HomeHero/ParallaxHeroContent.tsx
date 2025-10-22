"use client"

import { cn } from "@/lib/utils/cn"

interface ParallaxHeroContentProps {
  children: React.ReactNode
}

export const ParallaxHeroContent = ({ children }: ParallaxHeroContentProps) => {
  return (
    <div className="relative -mt-20 flex flex-col items-center px-4 pb-10 text-center md:-mt-24 lg:-mt-32">
      <div className="flex flex-col items-center gap-y-6 lg:max-w-3xl">
        {children}
      </div>
    </div>
  )
}
