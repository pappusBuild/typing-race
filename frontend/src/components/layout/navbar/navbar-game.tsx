import * as React from "react"

import { Logo } from "@/components/ui/logo/logo"

import { cn } from "@/lib/utils"


type NavbarMenu =
    | "Dashboard"
    | "Garage"
    | "Friends"
    | "Team"


type NavbarGameProps = React.ComponentProps<"nav"> & {
    activeMenu?: NavbarMenu
    onNavigate?: (menu: NavbarMenu) => void

    level?: number
    currentXp?: number
    maxXp?: number
}


const menuItems: NavbarMenu[] = [
    "Dashboard",
    "Garage",
    "Friends",
    "Team",
]


function NavbarGame({
    className,
    activeMenu = "Dashboard",
    onNavigate,

    level = 12,
    currentXp = 780,
    maxXp = 1000,

    ...props
}: NavbarGameProps) {

    const progress = (currentXp / maxXp) * 100

    return (
        <nav
            {...props}
            className={cn("flex w-full items-center justify-between border-b border-divider-primary px-8 pt-8 pb-12", className)}
        >

            {/* Logo */}
            <Logo className="shrink-0" />


            {/* Right Section */}
            <div className="flex items-center gap-8">

                {/* Navigation */}
                <div className="flex h-20 items-center">
                    {menuItems.map((menu) => {
                        const active = menu === activeMenu

                        return (
                            <button
                                key={menu}
                                type="button"
                                onClick={() => onNavigate?.(menu)}
                                className={cn(
                                    "flex h-full items-center px-6 font-['Poppins'] text-base transition-colors",
                                    active
                                        ? "font-semibold text-base-white underline"
                                        : "font-medium text-passive-color hover:text-base-white"
                                )}
                            >
                                {menu}
                            </button>
                        )
                    })}
                </div>


                {/* XP */}
                <div className="flex h-20 w-40 flex-col justify-center">
                    <div className="flex w-32 justify-between font-['Poppins']">
                        <span className="text-xs font-bold text-base-white">
                            LEVEL {level}
                        </span>

                        <span className="text-xs text-slate-400">
                            {currentXp}/{maxXp} XP
                        </span>
                    </div>


                    <div className="mt-2 h-2 w-32 overflow-hidden rounded-sm bg-game-primary">
                        <div
                            className="h-full bg-avatar-border/90"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>
                </div>

            </div>

        </nav>
    )
}


export { NavbarGame }
export type { NavbarGameProps }