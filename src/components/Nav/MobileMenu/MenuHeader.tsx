import Image from "next/image"

import { SheetClose, SheetTitle } from "@/components/ui/sheet"

import { useTranslation } from "@/hooks/useTranslation"

const MenuHeader = () => {
  const { t } = useTranslation("common")

  return (
    <div className="flex items-center justify-between p-6">
      <SheetTitle className="p-0">
        <Image src="/logo.png" alt="VPNL" width={48} height={48} className="rounded-lg" />
      </SheetTitle>
      <SheetClose className="w-fit text-md" data-testid="mobile-menu-close">
        {t("close")}
      </SheetClose>
    </div>
  )
}

export default MenuHeader
