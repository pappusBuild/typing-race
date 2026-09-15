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
            {/* Logo Gass dengan animasi blink */}
            <img
                src={gass}
                alt="Gass"
                className="w-48 group-hover:animate-[logo-blink_1s_ease-in-out_1]"
            />

            {/* Logo Type dengan efek Shine setelah blink selesai */}
            <div className="relative overflow-hidden w-32 -translate-y-0.5">
                <img
                    src={typeLogo}
                    alt="Type"
                    className="w-full block relative z-0"
                />
                
                {/* Elemen Sinar (Shine Effect) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 mix-blend-overlay opacity-0 group-hover:opacity-100">
                    <div className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 bg-lienar-to-br from-transparent via-white/80 to-transparent group-hover:animate-[shine-diagonal_0.8s_ease-in-out_1_1s]" />
                </div>
            </div>
        </div>
    )
}

export { Logo }
export type { LogoProps }