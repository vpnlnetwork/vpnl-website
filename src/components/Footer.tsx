"use client"

import { ChevronUp } from "lucide-react"

import type { FooterLink, FooterLinkSection } from "@/lib/types"

import Discord from "@/components/icons/discord.svg"
import Farcaster from "@/components/icons/farcaster.svg"
import Github from "@/components/icons/github.svg"
import Twitter from "@/components/icons/twitter.svg"
import Translation from "@/components/Translation"

import { cn } from "@/lib/utils/cn"
import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { Button } from "./ui/buttons/Button"
import { BaseLink } from "./ui/Link"
import { List, ListItem } from "./ui/list"

import { useTranslation } from "@/hooks/useTranslation"

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/vpnlnetwork/vpnl",
    ariaLabel: "GitHub",
  },
  {
    icon: Twitter,
    href: "https://t.me/vpnlnetwork",
    ariaLabel: "Telegram",
  },
]

type FooterProps = {
  lastDeployLocaleTimestamp: string
}

const Footer = ({ lastDeployLocaleTimestamp }: FooterProps) => {
  const { t } = useTranslation("common")

  const linkSections: FooterLinkSection[] = []

  const dipperLinks: FooterLink[] = [
    {
      href: "https://vpnlnetwork.eth.limo",
      text: "vpnlnetwork.eth",
    },
    {
      href: "mailto:vpnlnetwork@proton.me",
      text: "Contact",
    },
    {
      href: "https://t.me/vpnlnetwork",
      text: "Telegram",
    },
    {
      href: "https://github.com/vpnlnetwork/vpnl",
      text: "GitHub",
    },
  ]

  const footerLinkClassName =
    "text-body-medium no-underline hover:text-primary hover:after:text-primary"

  return (
    <footer className="px-4 py-4">
      <div className="flex flex-wrap items-center justify-center gap-8 border-t border-body-light px-4 py-4 md:justify-between">
        <p className="text-sm italic text-body-medium">
          <Translation id="website-last-updated" />: {lastDeployLocaleTimestamp}
        </p>

        <Button
          variant="outline"
          isSecondary
          onClick={() => scrollIntoView("body")}
          data-testid="footer-go-to-top"
        >
          <ChevronUp /> <Translation id="go-to-top" />
        </Button>
      </div>

      <div className="grid auto-cols-auto justify-between gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {linkSections.map((section: FooterLinkSection, idx) => (
          <div key={idx}>
            <h3 className="my-5 text-sm font-bold">{section.title}</h3>
            <List className="m-0 mb-4 list-none text-sm">
              {section.links.map((link, linkIdx) => (
                <ListItem key={linkIdx} className="mb-4">
                  <BaseLink
                    href={link.href}
                    className={footerLinkClassName}
                    isPartiallyActive={false}
                  >
                    {link.text}
                  </BaseLink>
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center bg-background-highlight p-6 text-sm">
        <div className="flex gap-4">
          {socialLinks.map(({ href, ariaLabel, icon: Icon }) => (
            <BaseLink
              key={href}
              href={href}
              hideArrow
              aria-label={ariaLabel}
              className="text-body hover:text-primary"
            >
              <Icon className="h-9 w-9 hover:transform hover:transition-colors" />
            </BaseLink>
          ))}
        </div>
        <p className="mt-4 text-sm text-body-medium">© 2025 VPNL — Verifiable Performance Network Layer</p>
        <List className="m-0 flex list-none flex-col flex-wrap justify-center p-5 text-sm font-normal sm:flex-row sm:justify-between md:justify-center">
          {dipperLinks.map(({ href, text }) => (
            <ListItem key={text} className="px-2 text-center">
              <BaseLink
                href={href}
                className={cn("w-full sm:w-auto", footerLinkClassName)}
                isPartiallyActive={false}
              >
                {text}
              </BaseLink>
            </ListItem>
          ))}
        </List>
      </div>
    </footer>
  )
}

export default Footer
