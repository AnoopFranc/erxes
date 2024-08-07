import { userLabelAtom } from "@/store/config.store"
import { useAtomValue } from "jotai"

import { cn } from "@/lib/utils"
import HeaderMenu from "@/components/headerMenu"

import Logo from "./logo"

const HeaderLayout = ({
  children,
  hideUser,
}: {
  children?: React.ReactNode
  hideUser?: boolean
}) => {
  const label = useAtomValue(userLabelAtom)
  return (
    <header className="flex flex-none items-center justify-between border-b px-3 md:px-5 py-1.5 print:hidden h-14 ">
      <div className={cn("flex w-auto items-center", !hideUser && "sm:w-1/3")}>
        <HeaderMenu />
        <Logo />
        {!hideUser && (
          <p className="hidden flex-auto text-center text-black/60 sm:block">
            {label}
          </p>
        )}
      </div>
      <div className={cn("pl-2 text-right sm:pl-4", !hideUser && "sm:w-2/3")}>
        {children}
      </div>
    </header>
  )
}

export default HeaderLayout
