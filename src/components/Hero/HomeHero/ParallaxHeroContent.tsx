"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils/cn"

interface ParallaxHeroContentProps {
  children: React.ReactNode
}

export const ParallaxHeroContent = ({ children }: ParallaxHeroContentProps) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="relative -mt-32 flex flex-col items-center px-4 pb-10 text-center md:-mt-40 lg:-mt-48"
      style={{
        transform: `translateY(${offset}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="flex flex-col items-center gap-y-6 rounded-2xl bg-background/95 px-6 py-8 shadow-lg backdrop-blur-sm lg:max-w-3xl lg:px-8 lg:py-10">
        {children}
      </div>
    </div>
  )
}
