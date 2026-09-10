import * as React from "react"

import gass from "@/assets/logo/gass.svg"
import typeLogo from "@/assets/logo/type.svg"

import { cn } from "@/lib/utils"

type LogoProps = React.ComponentProps<"div">

function Logo({ className, ...props }: LogoProps) {
    return (
        <div
            {...props}
            className={cn(
                "group flex items-end gap-2 transition-all",
                className
            )}
        >
            <img
                src={gass}
                alt="Gass"
                className="w-32 group-hover:animate-[logo-blink_1s_ease-in-out_1]"
            />

            <img
                src={typeLogo}
                alt="Type"
                className="w-24 -translate-y-0.5"
            />
        </div>
    )
}

export { Logo }
export type { LogoProps }